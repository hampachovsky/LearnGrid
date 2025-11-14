import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentsService } from './comments.service';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @MessagePattern({ cmd: 'create_comment' })
  createComment(@Payload() data) {
    return this.commentsService.createComment(
      data.userId,
      data.type,
      data.entityId,
      data.content,
    );
  }

  @MessagePattern({ cmd: 'update_comment' })
  updateComment(@Payload() data) {
    return this.commentsService.updateComment(
      data.commentId,
      data.userId,
      data.content,
    );
  }

  @MessagePattern({ cmd: 'delete_comment' })
  deleteComment(@Payload() data) {
    return this.commentsService.deleteComment(data.commentId, data.userId);
  }

  @MessagePattern({ cmd: 'get_comments_by_entity' })
  getCommentsByEntity(@Payload() data) {
    return this.commentsService.getCommentsByEntity(
      data.type,
      data.entityId,
      data.userId,
    );
  }

  @MessagePattern({ cmd: 'get_comments_by_class' })
  getCommentsByClass(@Payload() data) {
    return this.commentsService.getCommentsByClass(data.classId, data.userId);
  }
}
