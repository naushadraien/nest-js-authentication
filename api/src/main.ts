import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundFilter } from './common/filters/not-found/not-found.filter';
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
  // app.useGlobalFilters(new NotFoundFilter()); //this is for making the custom message for any route is not found

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
