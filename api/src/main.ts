import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsOptions } from './config/corsOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    // this global pipe will validate all incoming requests to ensure they match the expected shape of the DTOs
    new ValidationPipe({
      transform: true, // automatically transform payloads to DTO instances if possible
      whitelist: true, // strip any properties that don't have a corresponding DTO property
    }),
  );
  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
