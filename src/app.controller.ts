import {
  Controller,
  Get,
  Param,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { ApiExcludeController } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiExcludeController()
@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Get('/approvelist')
  @Render('approvelist')
  approve() {
    return {};
  }

  @Get('/bookreviews/:id')
  @Render('reviewslist')
  reviews(@Param('id') id: number) {
    return this.appService.showBookReviews(id);
  }
}
