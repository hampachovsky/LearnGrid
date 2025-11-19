import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('started gateway 3000');
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: true });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
