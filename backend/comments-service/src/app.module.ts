import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';
import { AnnouncementEntity } from './comments/entities/announcement.entity';
import { CommentEntity } from './comments/entities/comment.entity';
import { TaskEntity } from './comments/entities/task.entity';
import { UserEntity } from './comments/entities/user.entity';

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
        entities: [CommentEntity, AnnouncementEntity, UserEntity, TaskEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([
      CommentEntity,
      AnnouncementEntity,
      UserEntity,
      TaskEntity,
    ]),
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
