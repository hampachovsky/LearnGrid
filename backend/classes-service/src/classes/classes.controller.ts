import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { JoinClassDto } from './dto/join-class.dto';
import { LeaveClassDto } from './dto/leave-class.dto';

@Controller()
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @MessagePattern({ cmd: 'create_class' })
  create(@Payload() dto: CreateClassDto) {
    return this.classesService.create(dto);
  }

  @MessagePattern({ cmd: 'get_all_classes' })
  findAll() {
    return this.classesService.findAll();
  }

  @MessagePattern({ cmd: 'get_class_by_id' })
  getById(@Payload() id: number) {
    return this.classesService.findById(id);
  }

  @MessagePattern({ cmd: 'get_class_members' })
  getMembers(@Payload() classId: number) {
    return this.classesService.getMembers(classId);
  }

  @MessagePattern({ cmd: 'delete_class' })
  async delete(@Payload() id: number) {
    return this.classesService.remove(id);
  }

  @MessagePattern({ cmd: 'join_class' })
  join(@Payload() dto: JoinClassDto) {
    return this.classesService.joinClass(dto);
  }

  @MessagePattern({ cmd: 'leave_class' })
  leave(@Payload() dto: LeaveClassDto) {
    return this.classesService.leaveClass(dto);
  }
}
