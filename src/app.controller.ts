import {
  Controller,
  Get,
  Param,
  Render,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { ApiExcludeController } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthInterceptor } from './auth.interceptor';

@ApiExcludeController()
@Controller()
@UseInterceptors(LoggingInterceptor, AuthInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('index')
  root() {
    return {};
  }
  @Get()
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('/auth')
  auth() {
    return {};
  }

  @Get('/american')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('american')
  american() {
    return {};
  }

  @Get('/russian')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('russian')
  russian() {
    return {};
  }

  @Get('/comments')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('comments')
  comments() {
    return {};
  }

  @Get('/gallery')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('gallery')
  gallery() {
    return { layout: 'layouts/gallery_layout' };
  }

  @Get('/approvelist')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('approvelist')
  approve() {
    return {};
  }

  @Get('/bookreviews/:id')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('reviewslist')
  reviews(@Param('id') id: number) {
    return this.appService.showBookReviews(id);
  }

  @Get('/admin')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Render('admin')
  admin() {
    return {};
  }

  @Get('test')
  @UseGuards(new AuthGuard())
  async getTest(@Session() session: SessionContainer): Promise<string> {
    // TODO: magic
    return 'magic';
  }
}
