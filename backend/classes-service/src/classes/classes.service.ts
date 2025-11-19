import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { In, Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { JoinClassDto } from './dto/join-class.dto';
import { LeaveClassDto } from './dto/leave-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassUser } from './entities/class-user.entity';
import { ClassEntity } from './entities/class.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepo: Repository<ClassEntity>,
    @InjectRepository(ClassUser)
    private readonly classUserRepo: Repository<ClassUser>,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  async create(dto: CreateClassDto) {
    const savedClass = await this.classRepo.save(
      this.classRepo.create({ name: dto.name }),
    );

    const userData = await firstValueFrom(
      this.usersClient.send({ cmd: 'get_user_by_id' }, dto.userId),
    );

    const relation = this.classUserRepo.create({
      class: savedClass,
      user: userData,
      role: 'teacher',
    });

    await this.classUserRepo.save(relation);

    return this.classRepo.findOne({
      where: { id: savedClass.id },
      relations: ['members'],
    });
  }

  async updateClassName(dto: UpdateClassDto) {
    const cls = await this.classRepo.findOne({ where: { id: dto.classId } });
    if (!cls) {
      throw new RpcException({
        status: 404,
        message: 'Class not found',
      });
    }

    const relation = await this.classUserRepo.findOne({
      where: { class_id: dto.classId, user_id: dto.userId },
    });

    if (!relation) {
      throw new RpcException({
        status: 403,
        message: 'You are not a member of this class',
      });
    }

    if (relation.role !== 'teacher') {
      throw new RpcException({
        status: 403,
        message: 'Only teacher can edit class name',
      });
    }

    cls.name = dto.name;
    await this.classRepo.save(cls);

    return { message: 'Class name updated', class: cls };
  }

  async getMembers(classId: number) {
    const cls = await this.classRepo.findOne({ where: { id: classId } });
    if (!cls) {
      throw new RpcException({
        status: 404,
        message: 'Class not found',
      });
    }

    const links = await this.classUserRepo.find({
      where: { class_id: classId },
      select: ['user_id', 'role'],
    });
    if (!links.length) {
      throw new RpcException({
        status: 404,
        message: 'This class has no members yet',
      });
    }

    const userIds = [...new Set(links.map((l) => l.user_id))];
    if (userIds.length === 0) return { teacher: null, students: [] };

    const users = await firstValueFrom(
      this.usersClient.send({ cmd: 'get_users_by_ids' }, userIds),
    );

    if (!users?.length) {
      throw new RpcException({
        status: 404,
        message: 'No users found for this class',
      });
    }

    const usersMap = Object.fromEntries(users.map((u) => [u.id, u]));

    const teacher = links.find((l) => l.role === 'teacher');
    const teacherData = teacher ? (usersMap[teacher.user_id] ?? null) : null;

    const students = links
      .filter((l) => l.role === 'student')
      .map((l) => usersMap[l.user_id])
      .filter(Boolean);

    return { teacher: teacherData, students };
  }

  async findAll() {
    return this.classRepo.find({
      relations: ['members'],
    });
  }

  async findById(id: number) {
    return this.classRepo.findOne({
      where: { id },
      relations: ['members'],
    });
  }

  async remove(id: number) {
    const cls = await this.classRepo.findOne({ where: { id } });
    if (!cls) {
      throw new RpcException({
        status: 404,
        message: 'Class not found',
      });
    }

    await this.classRepo.remove(cls);

    return { message: `Class ${id} deleted successfully` };
  }

  async joinClass(dto: JoinClassDto) {
    const foundClass = await this.classRepo.findOne({
      where: { code: dto.code },
    });
    if (!foundClass)
      throw new RpcException({
        status: 404,
        message: 'Class not found',
      });

    const existing = await this.classUserRepo.findOne({
      where: { class_id: foundClass.id, user_id: dto.userId },
    });
    if (existing)
      throw new RpcException({
        status: 404,
        message: 'You are already in this class',
      });
    const userData = await firstValueFrom(
      this.usersClient.send({ cmd: 'get_user_by_id' }, dto.userId),
    );

    const relation = this.classUserRepo.create({
      class: foundClass,
      user_id: userData,
      role: 'student',
    });

    await this.classUserRepo.save(relation);

    return this.classRepo.findOne({
      where: { id: foundClass.id },
      relations: ['members'],
    });
  }

  async leaveClass(dto: LeaveClassDto) {
    const foundClass = await this.classRepo.findOne({
      where: { code: dto.code },
    });
    if (!foundClass)
      throw new RpcException({
        status: 404,
        message: 'Class not found',
      });

    const relation = await this.classUserRepo.findOne({
      where: { class_id: foundClass.id, user_id: dto.userId },
    });
    if (!relation)
      throw new RpcException({
        status: 400,
        message: 'You are not a member of this class',
      });

    await this.classUserRepo.remove(relation);
    return { message: `Left class ${foundClass.name}` };
  }

  async getClassUserEntry(classId: number, userId: number) {
    const entry = await this.classUserRepo.findOne({
      where: { class_id: classId, user_id: userId },
    });

    if (!entry) return null;

    return entry;
  }

  async getUserClassRole(classId: number, userId: number) {
    const relation = await this.classUserRepo.findOne({
      where: { class_id: classId, user_id: userId },
      select: ['role'],
    });

    return relation ? { role: relation.role } : null;
  }

  async getClassesForUser(userId: number) {
    const memberships = await this.classUserRepo.find({
      where: { user_id: userId },
      relations: ['class'],
    });

    if (!memberships.length) return [];

    const classIds = [...new Set(memberships.map((m) => m.class_id))];

    const teacherLinks = await this.classUserRepo.find({
      where: {
        class_id: In(classIds),
        role: 'teacher',
      },
    });

    const teacherIds = [...new Set(teacherLinks.map((t) => t.user_id))];

    const users = await firstValueFrom(
      this.usersClient.send({ cmd: 'get_users_by_ids' }, teacherIds),
    );

    const teacherMap = Object.fromEntries(users.map((u) => [u.id, u]));
    const classTeacherMap = Object.fromEntries(
      teacherLinks.map((t) => [t.class_id, t.user_id]),
    );

    const studentCountsRaw = await this.classUserRepo
      .createQueryBuilder('cu')
      .select('cu.class_id', 'class_id')
      .addSelect('COUNT(*)', 'count')
      .where('cu.role = :role', { role: 'student' })
      .andWhere('cu.class_id IN (:...classIds)', { classIds })
      .groupBy('cu.class_id')
      .getRawMany();

    const studentCountMap = Object.fromEntries(
      studentCountsRaw.map((row) => [row.class_id, Number(row.count)]),
    );

    return memberships.map((m) => ({
      id: m.class.id,
      name: m.class.name,
      role: m.role,
      teacher: teacherMap[classTeacherMap[m.class_id]] ?? null,
      studentCount: studentCountMap[m.class_id] ?? 0,
    }));
  }
}
