import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern({ cmd: 'create_task' })
  create(@Payload() { dto, userId }) {
    return this.tasksService.createTask(dto, userId);
  }

  @MessagePattern({ cmd: 'update_task' })
  update(@Payload() { taskId, dto, userId }) {
    return this.tasksService.updateTask(taskId, dto, userId);
  }

  @MessagePattern({ cmd: 'delete_task' })
  delete(@Payload() { taskId, userId }) {
    return this.tasksService.deleteTask(taskId, userId);
  }

  @MessagePattern({ cmd: 'get_tasks_by_topic' })
  getByTopic(@Payload() topicId: number) {
    return this.tasksService.getTasksByTopic(topicId);
  }

  @MessagePattern({ cmd: 'get_all_tasks_with_topics' })
  getAllWithTopics() {
    return this.tasksService.getAllTasksWithTopics();
  }

  @MessagePattern({ cmd: 'get_task_by_id' })
  getTaskById(@Payload() { taskId }) {
    return this.tasksService.getTaskById(taskId);
  }
}
