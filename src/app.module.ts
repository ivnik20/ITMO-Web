import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/UserModule';
import { BookModule } from './book/BookModule';
import { ReviewModule } from './review/ReviewModule';
import { CommentModule } from './comment/CommentModule';
import { CategoryModule } from './category/CategoryModule';

@Module({
  imports: [
    UserModule,
    BookModule,
    ReviewModule,
    CommentModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
