import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/UserModule';
import { BookModule } from './book/BookModule';
import { ReviewModule } from './review/ReviewModule';
import { CommentModule } from './comment/CommentModule';
import { CategoryModule } from './category/CategoryModule';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception.filter';

@Module({
  imports: [
    UserModule,
    BookModule,
    ReviewModule,
    CommentModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
