import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTopicDto } from 'src/classes/dto/create-topic.dto';
import { DeleteTopicDto } from 'src/classes/dto/delete-topic.dto';
import { UpdateTopicDto } from 'src/classes/dto/update-topic.dto';
import { TopicService } from './topics.service';

@Controller()
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @MessagePattern({ cmd: 'create_topic' })
  createTopic(@Payload() dto: CreateTopicDto) {
    return this.topicService.createTopic(dto);
  }

  @MessagePattern({ cmd: 'get_topics' })
  getTopics(@Payload() classId: number) {
    return this.topicService.getTopics(classId);
  }

  @MessagePattern({ cmd: 'delete_topic' })
  deleteTopic(@Payload() dto: DeleteTopicDto) {
    return this.topicService.deleteTopic(dto);
  }

  @MessagePattern({ cmd: 'update_topic' })
  updateTopic(@Payload() dto: UpdateTopicDto) {
    return this.topicService.updateTopicTitle(dto);
  }
}
