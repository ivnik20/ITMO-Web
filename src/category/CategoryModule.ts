import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/CategoryController';
import { CategoryService } from '../category/services/CategoryService';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
