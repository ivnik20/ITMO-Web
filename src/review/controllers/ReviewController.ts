import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from '../services/ReviewService';
import { ReviewDTO as ReviewModel } from '../ReviewDTO';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('Review')
@Controller('/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({
    summary: 'Create review',
  })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created.',
    type: ReviewModel,
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
  async create(@Body() body: ReviewModel): Promise<ReviewModel> {
    return this.reviewService.createReview(body);
  }

  @ApiOperation({
    summary: 'Get review by id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The review was successfully provided',
    type: ReviewModel,
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
  @Get('/id/:id')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  async getReviewById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReviewModel> {
    return this.reviewService.findReviewId(id);
  }

  @ApiOperation({
    summary: 'Get all reviews for book',
  })
  @ApiParam({ name: 'bookId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Reviews were successfully provided',
    type: ReviewModel,
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
  @Get('/bookId/:bookId')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  async getReviewsByBook(@Param('bookId', ParseIntPipe) bookId: number) {
    return { reviews: this.reviewService.findReviewsForBook(bookId) };
  }

  @ApiOperation({
    summary: 'Delete the review with provided id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The review was successfully deleted',
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
  @Delete('/id/:id')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  async deleteReviewById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.deleteReviewById(id);
  }
}
