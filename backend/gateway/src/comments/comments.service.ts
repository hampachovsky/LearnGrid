import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { mapRpcError } from 'src/utils/map-rpc-error';

@Injectable()
export class CommentsService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'comments-service', port: 3004 },
    });
  }

  createComment(
    dto: { type: string; entityId: number; content: string },
    userId: number,
  ) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'create_comment' }, { ...dto, userId })
        .pipe(mapRpcError('create comment failed')),
    );
  }

  updateComment(commentId: number, content: string, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'update_comment' }, { commentId, userId, content })
        .pipe(mapRpcError('update comment failed')),
    );
  }

  deleteComment(commentId: number, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'delete_comment' }, { commentId, userId })
        .pipe(mapRpcError('delete comment failed')),
    );
  }

  getCommentsByEntity(type: string, entityId: number, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'get_comments_by_entity' }, { type, entityId, userId })
        .pipe(mapRpcError('get comments by entity failed')),
    );
  }

  getCommentsByClass(classId: number, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'get_comments_by_class' }, { classId, userId })
        .pipe(mapRpcError('get comments by class failed')),
    );
  }
}
