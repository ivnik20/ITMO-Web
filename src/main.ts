import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const express = await require('express');
  const expressHbs = await require('express-handlebars');
  const hbs = await require('hbs');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.engine(
    'hbs',
    expressHbs.engine({
      layoutsDir: 'views/layouts',
      defaultLayout: 'layout',
      extname: 'hbs',
    }),
  );
  app.set('view engine', 'hbs');
  hbs.registerPartials(__dirname + '/views/partials');
  app.use(express.static('public'));
  await app.listen(3000);
}
bootstrap();
