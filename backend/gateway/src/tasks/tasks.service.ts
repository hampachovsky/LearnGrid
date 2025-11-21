import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { mapRpcError } from 'src/utils/map-rpc-error';

@Injectable()
export class TasksService {
  private client: ClientProxy;
  private commentsClient: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'tasks-service', port: 3003 },
    });

    this.commentsClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'comments-service', port: 3004 },
    });
  }

  async createTask(dto, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'create_task' }, { dto, userId })
        .pipe(mapRpcError('create task failed')),
    );
  }

  async updateTask(taskId: number, dto, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'update_task' }, { taskId, dto, userId })
        .pipe(mapRpcError('update task failed')),
    );
  }

  async deleteTask(taskId: number, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'delete_task' }, { taskId, userId })
        .pipe(mapRpcError('delete task failed')),
    );
  }

  async getTasksByTopic(topicId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'get_tasks_by_topic' }, topicId)
        .pipe(mapRpcError('get tasks by topic failed')),
    );
  }

  async getAllTasksWithTopics() {
    return firstValueFrom(
      this.client
        .send({ cmd: 'get_all_tasks_with_topics' }, {})
        .pipe(mapRpcError('get all tasks with topics failed')),
    );
  }

  async getTaskWithSubmission(taskId: number, userId: number) {
    const taskData = await firstValueFrom(
      this.client
        .send({ cmd: 'get_task_with_submission' }, { taskId, userId })
        .pipe(mapRpcError('get task failed')),
    );

    const comments = await firstValueFrom(
      this.commentsClient
        .send(
          { cmd: 'get_comments_by_entity' },
          { type: 'task', entityId: taskId, userId },
        )
        .pipe(mapRpcError('get comments by entity failed')),
    );

    return {
      ...(taskData as any),
      comments,
    };
  }
}
