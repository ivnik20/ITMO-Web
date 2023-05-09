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
import { CommentService } from '../../comment/services/CommentService';
import { CommentDTO as CommentModel } from '../CommentDTO';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('Comment')
@Controller('/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: 'Create comment',
  })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
    type: CommentModel,
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
  async create(@Body() body: CommentModel): Promise<CommentModel> {
    return this.commentService.createComment(body);
  }

  @ApiOperation({
    summary: 'Get comment by id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The comment was successfully provided',
    type: CommentModel,
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
  async getCommentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentModel> {
    return this.commentService.findCommentId(id);
  }

  @ApiOperation({
    summary: 'Get comments for category by title',
  })
  @ApiParam({ name: 'title', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Comments were successfully provided',
    type: CommentModel,
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
  async getPublishedComments(@Param('title') title: string) {
    return { comments: this.commentService.publishedForCategory(title) };
  }

  @ApiOperation({
    summary: 'Publish a comment by id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The comment was successfully published',
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
  @Patch('/id/:id')
  @UseGuards(new AuthGuard({ sessionRequired: false }))
  async publishComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.publishComment(id);
  }

  @ApiOperation({
    summary: 'Delete the comment with provided id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The comment was successfully deleted',
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
  async deleteCommentById(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteCommentById(id);
  }
}
