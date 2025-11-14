import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { AnnouncementEntity } from './entities/announcement.entity';
import { CommentEntity } from './entities/comment.entity';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      AnnouncementEntity,
      UserEntity,
      TaskEntity,
    ]),

    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'users-service',
          port: 3001,
        },
      },
      {
        name: 'CLASSES_SERVICE',
        transport: Transport.TCP,
        options: { host: 'classes-service', port: 3002 },
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
