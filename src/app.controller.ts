import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
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
    return { layout: 'layouts/gallery_layout' };
  }
}
