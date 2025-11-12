import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.PORT || 3001,
    },
  });
  // const config = app.get(ConfigService);
  // const port = config.get<number>('PORT') || 3001;

  console.log('started users service ', process.env.PORT);

  await app.listen();
}
bootstrap();
