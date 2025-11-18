import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
  async register(@Body() body: CreateUserDto) {
    return this.usersService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    const userId = req.user.userId;
    return this.usersService.getMe(userId);
  }
}
