import { Module } from '@nestjs/common';
import { CommentController } from './controllers/CommentController';
import { CommentService } from '../comment/services/CommentService';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
