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

  async create(dto, userId: number) {
    console.log(userId);
    return firstValueFrom(
      this.client.send({ cmd: 'create_class' }, { ...dto, userId }),
    );
  }

  async getById(id: number) {
    return firstValueFrom(this.client.send({ cmd: 'get_class_by_id' }, id));
  }

  async update(id: number, dto: any) {
    return firstValueFrom(
      this.client.send({ cmd: 'update_class' }, { id, dto }),
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
}
