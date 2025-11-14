import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { SubmissionEntity } from 'src/tasks/entities/submission.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepo: Repository<SubmissionEntity>,

    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,

    @Inject('CLASSES_SERVICE')
    private readonly classesClient: ClientProxy,

    @Inject('USERS_SERVICE')
    private readonly usersClient: ClientProxy,
  ) {}

  async validateUser(userId: number) {
    try {
      await firstValueFrom(
        this.usersClient.send({ cmd: 'get_users_by_ids' }, { ids: [userId] }),
      );
    } catch {
      throw new RpcException({ status: 404, message: 'User not found' });
    }
  }

  async getClassUserEntry(classId: number, userId: number) {
    const entry = await firstValueFrom(
      this.classesClient.send(
        { cmd: 'get_class_user_entry' },
        { classId, userId },
      ),
    );

    return entry;
  }

  async getTeacherFlag(classId: number, userId: number) {
    const members = await firstValueFrom(
      this.classesClient.send({ cmd: 'get_class_members' }, classId),
    );

    return members.teacher?.id === userId;
  }

  async getSubmissionOrFail(submissionId: number) {
    const submission = await this.submissionRepo.findOne({
      where: { id: submissionId },
      relations: ['task'],
    });

    if (!submission)
      throw new RpcException({
        status: 404,
        message: 'Submission not found',
      });

    return submission;
  }

  async createSubmission(dto, userId: number) {
    await this.validateUser(userId);

    const task = await this.taskRepo.findOne({
      where: { id: dto.task_id },
    });

    if (!task)
      throw new RpcException({ status: 404, message: 'Task not found' });

    const classUser = await this.getClassUserEntry(task.class_id, userId);

    if (!classUser || classUser.role !== 'student') {
      throw new RpcException({
        status: 403,
        message: 'Only students of this class can submit work',
      });
    }

    const existing = await this.submissionRepo.findOne({
      where: {
        task_id: task.id,
        class_user_id: classUser.id,
      },
    });

    if (existing) {
      throw new RpcException({
        status: 400,
        message: 'You already submitted this task',
      });
    }

    const submission = this.submissionRepo.create({
      task_id: task.id,
      class_user_id: classUser.id,
      content: dto.content,
    });

    return this.submissionRepo.save(submission);
  }

  async updateSubmission(submissionId: number, dto, userId: number) {
    await this.validateUser(userId);

    const submission = await this.getSubmissionOrFail(submissionId);

    const classUser = await this.getClassUserEntry(
      submission.task.class_id,
      userId,
    );

    if (!classUser || classUser.id !== submission.class_user_id) {
      throw new RpcException({
        status: 403,
        message: 'You can update only your own submission',
      });
    }

    submission.content = dto.content;
    submission.updated_at = new Date();

    return this.submissionRepo.save(submission);
  }

  async gradeSubmission(submissionId: number, grade: number, userId: number) {
    const submission = await this.getSubmissionOrFail(submissionId);

    const isTeacher = await this.getTeacherFlag(
      submission.task.class_id,
      userId,
    );

    if (!isTeacher) {
      throw new RpcException({
        status: 403,
        message: 'Only teacher can grade submissions',
      });
    }

    submission.grade = grade;
    submission.updated_at = new Date();

    return this.submissionRepo.save(submission);
  }

  async deleteSubmission(submissionId: number, userId: number) {
    const submission = await this.getSubmissionOrFail(submissionId);

    const classUser = await this.getClassUserEntry(
      submission.task.class_id,
      userId,
    );
    const isTeacher = await this.getTeacherFlag(
      submission.task.class_id,
      userId,
    );

    if (
      !isTeacher &&
      (!classUser || classUser.id !== submission.class_user_id)
    ) {
      throw new RpcException({
        status: 403,
        message: 'No permission to delete submission',
      });
    }

    await this.submissionRepo.remove(submission);

    return { success: true };
  }

  async getSubmissionsByTask(taskId: number) {
    return this.submissionRepo.find({
      where: { task_id: taskId },
      relations: ['classUser'],
    });
  }

  async getSubmissionsByClass(classId: number, userId: number) {
    const isTeacher = await this.getTeacherFlag(classId, userId);

    if (!isTeacher)
      throw new RpcException({
        status: 403,
        message: 'Only teacher can see class submissions',
      });

    return this.submissionRepo
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.task', 'task')
      .leftJoinAndSelect('submission.classUser', 'classUser')
      .where('task.class_id = :classId', { classId })
      .orderBy('submission.id', 'ASC')
      .getMany();
  }
}
