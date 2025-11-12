import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesController } from './classes/classes.controller';
import { ClassesService } from './classes/classes.service';
import { ClassUser } from './classes/entities/class-user.entity';
import { ClassEntity } from './classes/entities/class.entity';
import { UserEntity } from './classes/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        entities: [ClassEntity, ClassUser, UserEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([ClassEntity, ClassUser, UserEntity]),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'users-service',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class AppModule {}
