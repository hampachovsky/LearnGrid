import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopicsService } from './topics/topics.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TopicsService],
})
export class AppModule {}
