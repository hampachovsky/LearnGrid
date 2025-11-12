// import { HttpService } from '@nestjs/axios';
// import { Injectable } from '@nestjs/common';
// import { firstValueFrom } from 'rxjs';
// import { CreateUserDto } from './dto/create-user.dto';

// @Injectable()
// export class UsersService {
//   private readonly baseUrl = 'http://users-service:3001';

//   constructor(private readonly http: HttpService) {}

//   async login(credentials: { email: string; password: string }) {
//     const { data } = await firstValueFrom(
//       this.http.post(`${this.baseUrl}/auth/login`, credentials),
//     );
//     return data;
//   }

//   async register(dto: CreateUserDto) {
//     const { data } = await firstValueFrom(
//       this.http.post(`${this.baseUrl}/auth/register`, dto),
//     );
//     return data;
//   }
// }

import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { mapRpcError } from 'src/utils/map-rpc-error';

@Injectable()
export class UsersService implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'users-service',
        port: 3001,
      },
    });
  }

  async login(credentials: { email: string; password: string }) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'login' }, credentials)
        .pipe(mapRpcError('Login failed')),
    );
  }

  async register(dto: any) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'register' }, dto)
        .pipe(mapRpcError('Register failed')),
    );
  }
}
