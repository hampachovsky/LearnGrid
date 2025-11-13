import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './tasks/entities/class.entity';
import { SubmissionEntity } from './tasks/entities/submission.entity';
import { TaskEntity } from './tasks/entities/task.entity';
import { TopicEntity } from './tasks/entities/topic.entity';
import { UserEntity } from './tasks/entities/user.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        entities: [
          SubmissionEntity,
          TaskEntity,
          UserEntity,
          ClassEntity,
          TopicEntity,
        ],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([
      SubmissionEntity,
      TaskEntity,
      UserEntity,
      ClassEntity,
      TopicEntity,
    ]),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
