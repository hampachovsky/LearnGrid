import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAnnouncementDto } from 'src/classes/dto/create-announcement.dto';
import { DeleteAnnouncementDto } from 'src/classes/dto/delete-announcement.dto';
import { UpdateAnnouncementDto } from 'src/classes/dto/update-announcement.dto';
import { AnnouncementService } from './announcement.service';

@Controller()
export class AnnouncementController {
  constructor(private readonly service: AnnouncementService) {}

  @MessagePattern({ cmd: 'create_announcement' })
  create(@Payload() dto: CreateAnnouncementDto) {
    return this.service.create(dto);
  }

  @MessagePattern({ cmd: 'update_announcement' })
  update(@Payload() dto: UpdateAnnouncementDto) {
    return this.service.update(dto);
  }

  @MessagePattern({ cmd: 'delete_announcement' })
  delete(@Payload() dto: DeleteAnnouncementDto) {
    return this.service.delete(dto);
  }

  @MessagePattern({ cmd: 'get_announcements' })
  get(@Payload() classId: number) {
    return this.service.getAnnouncements(classId);
  }
}
