import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionsController } from 'src/submissions/submissions.controller';
import { SubmissionsService } from 'src/submissions/submissions.service';
import { ClassUser } from './entities/class-user.entity';
import { ClassEntity } from './entities/class.entity';
import { SubmissionEntity } from './entities/submission.entity';
import { TaskEntity } from './entities/task.entity';
import { TopicEntity } from './entities/topic.entity';
import { UserEntity } from './entities/user.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

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
  controllers: [TasksController, SubmissionsController],
  providers: [TasksService, SubmissionsService],
})
export class TasksModule {}
