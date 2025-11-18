import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('started gateway 3000');
  app.setGlobalPrefix('api');
  app.enableCors({ credentials: true });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
