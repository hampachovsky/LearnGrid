import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTopicDto } from 'src/classes/dto/create-topic.dto';
import { DeleteTopicDto } from 'src/classes/dto/delete-topic.dto';
import { UpdateTopicDto } from 'src/classes/dto/update-topic.dto';
import { ClassUser } from 'src/classes/entities/class-user.entity';
import { TopicEntity } from 'src/classes/entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepo: Repository<TopicEntity>,
    @InjectRepository(ClassUser)
    private readonly classUserRepo: Repository<ClassUser>,
  ) {}

  async createTopic(dto: CreateTopicDto) {
    const relation = await this.classUserRepo.findOne({
      where: { class_id: dto.classId, user_id: dto.userId },
    });

    if (!relation)
      throw new RpcException({
        status: 403,
        message: 'You are not a member of this class',
      });

    if (relation.role !== 'teacher')
      throw new RpcException({
        status: 403,
        message: 'Only teacher can create topics',
      });

    const topic = this.topicRepo.create({
      class_id: dto.classId,
      title: dto.title,
    });

    return await this.topicRepo.save(topic);
  }

  async getTopics(classId: number) {
    return this.topicRepo.find({
      where: { class_id: classId },
      order: { id: 'ASC' },
    });
  }

  async deleteTopic(dto: DeleteTopicDto) {
    const topic = await this.topicRepo.findOne({
      where: { id: dto.topicId },
    });

    if (!topic)
      throw new RpcException({ status: 404, message: 'Topic not found' });

    const relation = await this.classUserRepo.findOne({
      where: { class_id: topic.class_id, user_id: dto.userId },
    });

    if (!relation)
      throw new RpcException({
        status: 403,
        message: 'You are not a member of this class',
      });
    if (relation.role !== 'teacher')
      throw new RpcException({
        status: 403,
        message: 'Only teacher can delete topics',
      });

    await this.topicRepo.remove(topic);

    return { message: 'Topic deleted' };
  }

  async updateTopicTitle(dto: UpdateTopicDto) {
    const topic = await this.topicRepo.findOne({
      where: { id: dto.topicId },
    });

    if (!topic) {
      throw new RpcException({
        status: 404,
        message: 'Topic not found',
      });
    }

    const relation = await this.classUserRepo.findOne({
      where: { class_id: topic.class_id, user_id: dto.userId },
    });

    if (!relation) {
      throw new RpcException({
        status: 403,
        message: 'You are not a member of this class',
      });
    }

    if (relation.role !== 'teacher') {
      throw new RpcException({
        status: 403,
        message: 'Only teacher can update topics',
      });
    }

    topic.title = dto.title;
    await this.topicRepo.save(topic);

    return { message: 'Topic title updated', topic };
  }
}
