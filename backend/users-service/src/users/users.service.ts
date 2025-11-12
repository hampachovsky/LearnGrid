import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });

    if (existing) {
      throw new RpcException({
        status: 409,
        message: 'User with this email already exists',
      });
    }

    const user = this.userRepo.create({
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      secondName: createUserDto.secondName,
      passwordHash: createUserDto.password,
      role: createUserDto.role,
    });

    try {
      return await this.userRepo.save(user);
    } catch (error) {
      console.error('Error saving user:', error);
      throw new RpcException({
        status: 500,
        message: 'Failed to create user',
      });
    }
  }

  findAll() {
    return this.userRepo.find();
  }

  async findByIds(ids: number[]) {
    if (!ids.length) return [];
    return this.userRepo.find({
      where: { id: In(ids) },
      select: ['id', 'firstName', 'secondName', 'email', 'role'],
    });
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
