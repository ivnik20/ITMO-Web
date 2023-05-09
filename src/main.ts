import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception.filter';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import { AuthInterceptor } from './auth.interceptor';
import { UserService } from './user/services/UserService';
import { LoggingInterceptor } from './logging.interceptor';

async function bootstrap() {
  const express = await require('express');
  const hbs = await require('hbs');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('view engine', 'hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/partials'));
  app.set('view options', { layout: 'layouts/layout' });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(express.static(join(__dirname, '..', 'public')));
  app.useGlobalInterceptors(
    new AuthInterceptor(app.get(UserService)),
    new LoggingInterceptor(),
  );

  app.enableCors({
    origin: [process.env.URL],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Nabokovian')
    .setDescription('Nabokovian API description')
    .setVersion('1.0')
    .addCookieAuth('sAccessToken', { type: 'apiKey' }, 'JWT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
