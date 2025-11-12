import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
}
