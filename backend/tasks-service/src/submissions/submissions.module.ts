import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassUser } from 'src/tasks/entities/class-user.entity';
import { ClassEntity } from 'src/tasks/entities/class.entity';
import { SubmissionEntity } from 'src/tasks/entities/submission.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { TopicEntity } from 'src/tasks/entities/topic.entity';
import { UserEntity } from 'src/tasks/entities/user.entity';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubmissionEntity,
      TaskEntity,
      UserEntity,
      ClassEntity,
      TopicEntity,
      ClassUser,
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
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
