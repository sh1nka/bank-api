import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('bank/api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000, () =>
    Logger.verbose(`Bank API is running on port 3000`),
  );
}
bootstrap();
