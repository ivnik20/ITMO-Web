import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CategoryService } from '../services/CategoryService';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDTO as CategoryModel } from '../CategoryDTO';
import { BookDTO as BookModel } from 'src/book/BookDTO';
import { Period } from '@prisma/client';

@ApiTags('Category')
@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'Create category',
  })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Post('')
  async create(@Body() body: CategoryModel): Promise<CategoryModel> {
    return this.categoryService.createCategory(body);
  }

  @ApiOperation({
    summary: 'Get category by title',
  })
  @ApiParam({ name: 'title', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'The category was successfully provided',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Get('/byname/:name')
  async getCategoryById(@Param('name') name: string): Promise<CategoryModel> {
    return this.categoryService.findCategoryTitle(name);
  }

  @ApiOperation({
    summary: 'Delete the category with provided title',
  })
  @ApiParam({ name: 'title', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The category was successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Delete('/byname/:name')
  async deleteCategoryByTitle(@Param('name') id: string) {
    return this.categoryService.deleteCategoryByTitle(id);
  }
}
