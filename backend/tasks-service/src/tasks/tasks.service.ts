import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { TopicEntity } from './entities/topic.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,

    @InjectRepository(TopicEntity)
    private readonly topicRepo: Repository<TopicEntity>,

    @Inject('USERS_SERVICE')
    private readonly usersClient: ClientProxy,

    @Inject('CLASSES_SERVICE')
    private readonly classesClient: ClientProxy,
  ) {}

  async validateUser(userId: number) {
    try {
      console.log(
        await firstValueFrom(
          this.usersClient.send({ cmd: 'get_users_by_ids' }, { ids: [userId] }),
        ),
      );
    } catch {
      throw new RpcException({ status: 404, message: 'User not found' });
    }
  }

  async validateTopicExists(topic_id: number) {
    const topic = await this.topicRepo.findOne({ where: { id: topic_id } });
    if (!topic)
      throw new RpcException({
        status: 403,
        message: 'Topic not found',
      });

    return topic;
  }

  async validateTeacherAccess(topic_id: number, userId: number) {
    const topic = await this.validateTopicExists(topic_id);

    const members = await firstValueFrom(
      this.classesClient.send({ cmd: 'get_class_members' }, topic.class_id),
    );

    console.log('members', members);

    const teacher = members.teacher;

    if (!teacher) {
      throw new RpcException({
        status: 500,
        message: 'Class has no teacher assigned',
      });
    }

    if (teacher.id !== userId) {
      throw new RpcException({
        status: 403,
        message: 'Only class teacher can manage tasks',
      });
    }

    return topic;
  }

  // !

  async createTask(dto, userId: number) {
    await this.validateUser(userId);

    const topic = await this.validateTeacherAccess(dto.topic_id, userId);

    const task = this.taskRepo.create({
      ...dto,
      due_date: dto.due_date ? new Date(dto.due_date) : null,
      topic,
      topic_id: topic.id,
      class_id: topic.class_id,
    });

    return this.taskRepo.save(task);
  }

  async updateTask(taskId: number, dto, userId: number) {
    await this.validateUser(userId);

    const task = await this.taskRepo.findOne({ where: { id: taskId } });
    if (!task)
      throw new RpcException({ status: 404, message: 'Task not found' });

    const topicIdToCheck = dto.topic_id ?? task.topic_id;

    await this.validateTeacherAccess(topicIdToCheck, userId);

    if (dto.topic_id) {
      const topic = await this.validateTopicExists(dto.topic_id);
      task.topic = topic;
      task.topic_id = topic.id;
      task.class_id = topic.class_id;
    }

    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.due_date !== undefined)
      task.due_date = dto.due_date ? new Date(dto.due_date) : (null as any);

    return this.taskRepo.save(task);
  }

  async deleteTask(taskId: number, userId: number) {
    await this.validateUser(userId);

    const task = await this.taskRepo.findOne({ where: { id: taskId } });
    if (!task)
      throw new RpcException({ status: 404, message: 'Task not found' });

    await this.validateTeacherAccess(task.topic_id, userId);

    await this.taskRepo.remove(task);
    return { success: true };
  }

  async getTasksByTopic(topicId: number) {
    await this.validateTopicExists(topicId);

    return this.taskRepo.find({
      where: { topic_id: topicId },
      relations: ['topic'],
      order: { id: 'ASC' },
    });
  }

  async getAllTasksWithTopics() {
    return this.taskRepo.find({
      relations: ['topic'],
      order: { topic_id: 'ASC', id: 'ASC' },
    });
  }

  async getTaskById(taskId: number) {
    const task = await this.taskRepo.findOne({
      where: { id: taskId },
    });

    return task;
  }
}
