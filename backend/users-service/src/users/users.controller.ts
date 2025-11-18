import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  findOne(@Body() id: string) {
    return this.usersService.findOne(+id);
  }

  @MessagePattern({ cmd: 'get_users_by_ids' })
  getUsersByIds(@Payload() ids: number[]) {
    console.log('test');
    return this.usersService.findByIds(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @MessagePattern({ cmd: 'me' })
  async me(data: { userId: number }) {
    const user = await this.usersService.findOne(data.userId);

    if (!user) {
      throw new RpcException({
        status: 404,
        message: 'User not found',
      });
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      secondName: user.secondName,
      role: user.role,
    };
  }
}
