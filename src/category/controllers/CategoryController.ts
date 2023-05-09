import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req, UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../services/CategoryService';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDTO as CategoryModel } from '../CategoryDTO';
import { BookDTO as BookModel } from 'src/book/BookDTO';
import { Period } from '@prisma/client';
import {AuthGuard} from "../../auth/auth.guard";

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
    type: CategoryModel,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @Post('')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  async create(@Body() body: CategoryModel): Promise<CategoryModel> {
    return this.categoryService.createCategory(body);
  }

  @ApiOperation({
    summary: 'Get category by title',
  })
  @ApiParam({ name: 'title', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The category was successfully provided',
    type: CategoryModel,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @Get('/title/:title')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  async getCategoryByTitle(
    @Param('title') title: string,
  ): Promise<CategoryModel> {
    return this.categoryService.findCategoryTitle(title);
  }

  @ApiOperation({
    summary: 'Get all categories for period',
  })
  @ApiParam({ name: 'period', enum: Period })
  @ApiResponse({
    status: 200,
    description: 'Categories were successfully provided',
    type: CategoryModel,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @Get('/period/:period')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  async getCategories(
    @Param('period') period: Period,
  ): Promise<CategoryModel[]> {
    return this.categoryService.forPeriod(period);
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
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @Delete('/title/:title')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  async deleteCategoryByTitle(@Param('title') title: string) {
    return this.categoryService.deleteCategoryByTitle(title);
  }
}
