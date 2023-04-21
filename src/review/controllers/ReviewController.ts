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
import { ReviewService } from '../services/ReviewService';
import { ReviewDTO as ReviewModel } from '../ReviewDTO';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Post('')
  async create(@Body() body: ReviewModel): Promise<ReviewModel> {
    return this.reviewService.createReview(body);
  }

  @ApiOperation({
    summary: 'Get review by id',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'The review was successfully provided',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Get('/byid/:id')
  async getReviewById(@Param('id') id: string): Promise<ReviewModel> {
    return this.reviewService.findReviewId(id);
  }

  @ApiOperation({
    summary: 'Delete the review with provided id',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The review was successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Delete('/byid/:id')
  async deleteReviewById(@Param('id') id: string) {
    return this.reviewService.deleteReviewById(id);
  }
}
