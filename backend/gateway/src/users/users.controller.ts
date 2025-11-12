import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: any) {
    return this.usersService.login(body);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto, @Req() req: any) {
    return this.usersService.register(body);
  }
}
