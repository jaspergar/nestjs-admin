import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe()); //to enable validation on dto on Pipe
  app.use(cookieParser());
  app.enableCors({
      origin: 'http://localhost:4200',
      credentials : true
  }); //To enable Cors
  await app.listen(3000);
}
bootstrap();
