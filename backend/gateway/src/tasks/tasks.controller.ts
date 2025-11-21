import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() dto, @Req() req) {
    return this.tasksService.createTask(dto, req.user.userId);
  }

  @Put(':taskId')
  updateTask(@Param('taskId') taskId: number, @Body() dto, @Req() req) {
    return this.tasksService.updateTask(taskId, dto, req.user.userId);
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') taskId: number, @Req() req) {
    return this.tasksService.deleteTask(taskId, req.user.userId);
  }

  @Get('/topic/:topicId')
  getTasksByTopic(@Param('topicId') topicId: number) {
    return this.tasksService.getTasksByTopic(topicId);
  }

  @Get(':taskId')
  getTaskWithSubmission(@Param('taskId') taskId: number, @Req() req) {
    return this.tasksService.getTaskWithSubmission(taskId, req.user.userId);
  }

  @Get()
  getAllTasksWithTopics() {
    return this.tasksService.getAllTasksWithTopics();
  }
}
