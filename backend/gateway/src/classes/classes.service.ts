import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { mapRpcError } from 'src/utils/map-rpc-error';

@Injectable()
export class ClassesService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'classes-service', port: 3002 },
    });
  }

  async getAll() {
    return firstValueFrom(this.client.send({ cmd: 'get_all_classes' }, {}));
  }

  async getClassMembers(classId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'get_class_members' }, classId)
        .pipe(mapRpcError('get members failed')),
    );
  }

  async getMyClasses(userId: number) {
  return firstValueFrom(
    this.client
      .send({ cmd: 'get_classes_for_user' }, { userId })
      .pipe(mapRpcError('failed to get user classes')),
  );
}

  async create(dto, userId: number) {
    console.log(userId);
    return firstValueFrom(
      this.client.send({ cmd: 'create_class' }, { ...dto, userId }),
    );
  }

  async getById(id: number) {
    return firstValueFrom(this.client.send({ cmd: 'get_class_by_id' }, id));
  }

  async updateClassName(classId: number, userId: number, name: string) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'update_class_name' }, { classId, userId, name })
        .pipe(mapRpcError('update class name failed')),
    );
  }

  async remove(id: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'delete_class' }, id)
        .pipe(mapRpcError('remove failed')),
    );
  }

  async joinClass(code: string, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'join_class' }, { code, userId })
        .pipe(mapRpcError('join failed')),
    );
  }

  async leaveClass(code: string, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'leave_class' }, { code, userId })
        .pipe(mapRpcError('leave failed')),
    );
  }

  // ! Topics

  async createTopic(classId: number, userId: number, title: string) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'create_topic' }, { classId, userId, title })
        .pipe(mapRpcError('create topic failed')),
    );
  }

  async getTopics(classId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'get_topics' }, classId)
        .pipe(mapRpcError('get topics failed')),
    );
  }

  async deleteTopic(topicId: number, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'delete_topic' }, { topicId, userId })
        .pipe(mapRpcError('delete topic failed')),
    );
  }
  async updateTopicTitle(topicId: number, userId: number, title: string) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'update_topic' }, { topicId, userId, title })
        .pipe(mapRpcError('update topic title failed')),
    );
  }

  // ! Announcements
  async createAnnouncement(classId: number, userId: number, content: string) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'create_announcement' }, { classId, userId, content })
        .pipe(mapRpcError('create announcement failed')),
    );
  }

  async updateAnnouncement(
    announcementId: number,
    userId: number,
    content: string,
  ) {
    return firstValueFrom(
      this.client
        .send(
          { cmd: 'update_announcement' },
          { announcementId, userId, content },
        )
        .pipe(mapRpcError('update announcement failed')),
    );
  }

  async deleteAnnouncement(announcementId: number, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'delete_announcement' }, { announcementId, userId })
        .pipe(mapRpcError('delete announcement failed')),
    );
  }

  async getAnnouncements(classId: number) {
    return firstValueFrom(
      this.client.send({ cmd: 'get_announcements' }, classId),
    );
  }
}
