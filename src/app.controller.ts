import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './logging.interceptor';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { loggedIn: false, user: 'Никита' };
  }

  @Get('/american')
  @Render('american')
  american() {
    return {};
  }

  @Get('/russian')
  @Render('russian')
  russian() {
    return {};
  }

  @Get('/comments')
  @Render('comments')
  comments() {
    return {};
  }

  @Get('/gallery')
  @Render('gallery')
  gallery() {
    return { layout: 'gallery_layout' };
  }
}
