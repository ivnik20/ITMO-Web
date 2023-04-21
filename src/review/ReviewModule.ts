import { Module } from '@nestjs/common';
import { ReviewController } from './controllers/ReviewController';
import { ReviewService } from './services/ReviewService';

@Module({
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
