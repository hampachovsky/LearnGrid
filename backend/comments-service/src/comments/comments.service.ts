import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repo: Repository<CommentEntity>,

    @Inject('USERS_SERVICE')
    private readonly usersClient: ClientProxy,

    @Inject('CLASSES_SERVICE')
    private readonly classesClient: ClientProxy,

    @Inject('TASKS_SERVICE')
    private readonly tasksClient: ClientProxy,
  ) {}

  async createComment(
    userId: number,
    type: 'task' | 'announcement',
    entityId: number,
    content: string,
  ) {
    const user = await firstValueFrom(
      this.usersClient.send({ cmd: 'get_user_by_id' }, userId),
    );

    if (!user)
      throw new RpcException({ status: 404, message: 'User not found' });

    let classId: number;

    if (type === 'task') {
      const task = await firstValueFrom(
        this.tasksClient.send({ cmd: 'get_task_by_id' }, { taskId: entityId }),
      );
      if (!task)
        throw new RpcException({ status: 404, message: 'Task not found' });
      classId = task.class_id;
    } else {
      const announcement = await firstValueFrom(
        this.classesClient.send(
          { cmd: 'get_announcement_by_id' },
          { announcementId: entityId },
        ),
      );
      if (!announcement)
        throw new RpcException({
          status: 404,
          message: 'Announcement not found',
        });
      classId = announcement.class_id;
    }

    const member = await firstValueFrom(
      this.classesClient.send(
        { cmd: 'get_user_class_role' },
        { classId, userId },
      ),
    );

    if (!member)
      throw new RpcException({ status: 403, message: 'Not a class member' });

    const comment = this.repo.create({
      user_id: userId,
      type,
      content,
      [`${type}_id`]: entityId,
    });

    return this.repo.save(comment);
  }

  async updateComment(commentId: number, userId: number, content: string) {
    const comment = await this.repo.findOne({ where: { id: commentId } });
    if (!comment)
      throw new RpcException({ status: 404, message: 'Comment not found' });
    if (comment.user_id !== userId)
      throw new RpcException({
        status: 403,
        message: 'Cannot edit others comments',
      });

    comment.content = content;
    return this.repo.save(comment);
  }

  async deleteComment(commentId: number, userId: number) {
    const comment = await this.repo.findOne({ where: { id: commentId } });
    if (!comment)
      throw new RpcException({ status: 404, message: 'Comment not found' });

    let classId: number;

    if (comment.type === 'task') {
      const task = await firstValueFrom(
        this.tasksClient.send(
          { cmd: 'get_task_by_id' },
          { taskId: comment.task_id },
        ),
      );
      if (!task)
        throw new RpcException({ status: 404, message: 'Task not found' });
      classId = task.class_id;
    } else {
      const announcement = await firstValueFrom(
        this.classesClient.send(
          { cmd: 'get_announcement_by_id' },
          { announcementId: comment.announcement_id },
        ),
      );
      if (!announcement)
        throw new RpcException({
          status: 404,
          message: 'Announcement not found',
        });
      classId = announcement.class_id;
    }

    const member = await firstValueFrom(
      this.classesClient.send(
        { cmd: 'get_user_class_role' },
        { classId, userId },
      ),
    );
    if (!member)
      throw new RpcException({ status: 403, message: 'Not a class member' });

    if (member.role !== 'teacher' && comment.user_id !== userId)
      throw new RpcException({ status: 403, message: 'Forbidden' });

    await this.repo.delete(commentId);
    return { success: true };
  }

  async getCommentsByEntity(
    type: 'task' | 'announcement',
    entityId: number,
    userId: number,
  ) {
    let classId: number;

    if (type === 'task') {
      const task = await firstValueFrom(
        this.tasksClient.send({ cmd: 'get_task_by_id' }, { taskId: entityId }),
      );
      if (!task)
        throw new RpcException({ status: 404, message: 'Task not found' });
      classId = task.class_id;
    } else {
      const announcement = await firstValueFrom(
        this.classesClient.send(
          { cmd: 'get_announcement_by_id' },
          { announcementId: entityId },
        ),
      );
      if (!announcement)
        throw new RpcException({
          status: 404,
          message: 'Announcement not found',
        });
      classId = announcement.class_id;
    }

    const member = await firstValueFrom(
      this.classesClient.send(
        { cmd: 'get_user_class_role' },
        { classId, userId },
      ),
    );
    if (!member)
      throw new RpcException({ status: 403, message: 'Not a class member' });

    return this.repo.find({
      where: { [`${type}_id`]: entityId },
      order: { created_at: 'ASC' },
    });
  }

  async getCommentsByClass(classId: number, userId: number) {
    const member = await firstValueFrom(
      this.classesClient.send(
        { cmd: 'get_user_class_role' },
        { classId, userId },
      ),
    );
    if (!member)
      throw new RpcException({ status: 403, message: 'Not a class member' });
    if (member.role !== 'teacher')
      throw new RpcException({
        status: 403,
        message: 'Only teachers can view all class comments',
      });

    const tasks = await firstValueFrom(
      this.tasksClient.send({ cmd: 'get_tasks_by_class' }, { classId }),
    );

    const announcements = await firstValueFrom(
      this.classesClient.send(
        { cmd: 'get_announcements_by_class' },
        { classId },
      ),
    );

    const taskIds = tasks.map((t) => t.id);
    const announcementIds = announcements.map((a) => a.id);

    return this.repo
      .createQueryBuilder('c')
      .where(
        '(c.task_id IN (:...taskIds) OR c.announcement_id IN (:...announcementIds))',
        { taskIds, announcementIds },
      )
      .orderBy('c.created_at', 'ASC')
      .getMany();
  }
}
