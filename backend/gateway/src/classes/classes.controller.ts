import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClassesService } from './classes.service';

@Controller('classes')
@UseGuards(JwtAuthGuard)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  getAll() {
    return this.classesService.getAll();
  }

  @Post()
  create(@Body() dto, @Req() req) {
    return this.classesService.create(dto, req.user.userId);
  }

  @Get(':id/members')
  getMembers(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.getClassMembers(id);
  }

  @Patch(':id')
  updateClass(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
    @Req() req,
  ) {
    return this.classesService.updateClassName(id, req.user.userId, name);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.remove(id);
  }

  @Post('join')
  join(@Body('code') code: string, @Req() req) {
    const userId = req.user.userId;
    return this.classesService.joinClass(code, userId);
  }

  @Post('leave')
  leave(@Body('code') code: string, @Req() req) {
    const userId = req.user.userId;
    return this.classesService.leaveClass(code, userId);
  }

  // ! Topics

  @Post(':id/topics')
  createTopic(
    @Param('id', ParseIntPipe) classId: number,
    @Body('title') title: string,
    @Req() req,
  ) {
    return this.classesService.createTopic(classId, req.user.userId, title);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/topics')
  getTopics(@Param('id', ParseIntPipe) classId: number) {
    return this.classesService.getTopics(classId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('topics/:topicId')
  deleteTopic(@Param('topicId', ParseIntPipe) topicId: number, @Req() req) {
    return this.classesService.deleteTopic(topicId, req.user.userId);
  }

  @Patch('topics/:topicId')
  updateTopic(
    @Param('topicId', ParseIntPipe) topicId: number,
    @Body('title') title: string,
    @Req() req,
  ) {
    return this.classesService.updateTopicTitle(
      topicId,
      req.user.userId,
      title,
    );
  }

  // ! Announcements

  @UseGuards(JwtAuthGuard)
  @Post(':id/announcements')
  createAnn(
    @Param('id', ParseIntPipe) classId: number,
    @Req() req,
    @Body('content') content: string,
  ) {
    return this.classesService.createAnnouncement(
      classId,
      req.user.userId,
      content,
    );
  }

  @Patch('announcements/:annId')
  updateAnn(
    @Param('annId', ParseIntPipe) annId: number,
    @Req() req,
    @Body('content') content: string,
  ) {
    return this.classesService.updateAnnouncement(
      annId,
      req.user.userId,
      content,
    );
  }

  @Delete('announcements/:annId')
  deleteAnn(@Param('annId', ParseIntPipe) annId: number, @Req() req) {
    return this.classesService.deleteAnnouncement(annId, req.user.userId);
  }

  @Get(':id/announcements')
  getAnnouncements(@Param('id', ParseIntPipe) classId: number) {
    return this.classesService.getAnnouncements(classId);
  }
}
