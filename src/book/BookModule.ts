import { Module } from '@nestjs/common';
import { BookController } from './controllers/BookController';
import { BookService } from './services/BookService';

@Module({
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
