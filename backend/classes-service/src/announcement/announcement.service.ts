import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAnnouncementDto } from 'src/classes/dto/create-announcement.dto';
import { DeleteAnnouncementDto } from 'src/classes/dto/delete-announcement.dto';
import { UpdateAnnouncementDto } from 'src/classes/dto/update-announcement.dto';
import { AnnouncementEntity } from 'src/classes/entities/announcement.entity';
import { ClassUser } from 'src/classes/entities/class-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(AnnouncementEntity)
    private readonly annRepo: Repository<AnnouncementEntity>,
    @InjectRepository(ClassUser)
    private readonly classUserRepo: Repository<ClassUser>,
  ) {}

  async create(dto: CreateAnnouncementDto) {
    const relation = await this.classUserRepo.findOne({
      where: { class_id: dto.classId, user_id: dto.userId },
    });

    if (!relation || relation.role !== 'teacher') {
      throw new RpcException({
        status: 403,
        message: 'Only teacher can create announcements',
      });
    }

    const ann = this.annRepo.create({
      class_id: dto.classId,
      content: dto.content,
    });

    return this.annRepo.save(ann);
  }

  async update(dto: UpdateAnnouncementDto) {
    const ann = await this.annRepo.findOne({
      where: { id: dto.announcementId },
    });

    if (!ann)
      throw new RpcException({
        status: 404,
        message: 'Announcement not found',
      });

    const relation = await this.classUserRepo.findOne({
      where: { class_id: ann.class_id, user_id: dto.userId },
    });

    if (!relation || relation.role !== 'teacher')
      throw new RpcException({
        status: 403,
        message: 'Only teacher can update announcements',
      });

    ann.content = dto.content;
    return this.annRepo.save(ann);
  }

  async delete(dto: DeleteAnnouncementDto) {
    const ann = await this.annRepo.findOne({
      where: { id: dto.announcementId },
    });

    if (!ann)
      throw new RpcException({
        status: 404,
        message: 'Announcement not found',
      });

    const relation = await this.classUserRepo.findOne({
      where: { class_id: ann.class_id, user_id: dto.userId },
    });

    if (!relation || relation.role !== 'teacher')
      throw new RpcException({
        status: 403,
        message: 'Only teacher can delete announcements',
      });

    await this.annRepo.remove(ann);

    return { message: 'Announcement deleted' };
  }

  async getAnnouncements(classId: number) {
    return this.annRepo.find({
      where: { class_id: classId },
      order: { id: 'DESC' },
    });
  }
}
