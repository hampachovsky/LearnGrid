import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClassesController } from './classes/classes.controller';
import { ClassesService } from './classes/classes.service';
import { SubmissionsController } from './submissions/submissions.controller';
import { SubmissionsService } from './submissions/submissions.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    ClientsModule.register([
      {
        name: 'TASKS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'tasks-service',
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [
    AppController,
    ClassesController,
    TasksController,
    SubmissionsController,
  ],
  providers: [AppService, ClassesService, TasksService, SubmissionsService],
})
export class AppModule {}
