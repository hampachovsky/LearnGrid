import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentsService } from './comments.service';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createComment(@Body() dto, @Req() req) {
    return this.commentsService.createComment(dto, req.user.userId);
  }

  @Patch(':id')
  updateComment(
    @Param('id') id: number,
    @Body('content') content: string,
    @Req() req,
  ) {
    return this.commentsService.updateComment(id, content, req.user.userId);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: number, @Req() req) {
    return this.commentsService.deleteComment(id, req.user.userId);
  }

  @Get('/:type/:entityId')
  getCommentsByEntity(
    @Param('type') type: string,
    @Param('entityId') entityId: number,
    @Req() req,
  ) {
    return this.commentsService.getCommentsByEntity(
      type,
      entityId,
      req.user.userId,
    );
  }

  @Get('/class/:classId')
  getCommentsByClass(@Param('classId') classId: number, @Req() req) {
    return this.commentsService.getCommentsByClass(classId, req.user.userId);
  }
}
