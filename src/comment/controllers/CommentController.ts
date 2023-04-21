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
import { CommentService } from '../../comment/services/CommentService';
import { CommentDTO as CommentModel } from '../CommentDTO';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {BookDTO as BookModel} from "../../book/BookDTO";

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
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Post('')
  async create(@Body() body: CommentModel): Promise<CommentModel> {
    return this.commentService.createComment(body);
  }

  @ApiOperation({
    summary: 'Get comment by id',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'The comment was successfully provided',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Get('/byid/:id')
  async getCommentById(@Param('id') id: string): Promise<CommentModel> {
    return this.commentService.findCommentId(id);
  }

  @ApiOperation({
    summary: 'Get all published comments',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'Books were successfully provided',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Get('getallpublished')
  async getPublishedPosts(): Promise<CommentModel[]> {
    return this.commentService.published();
  }

  @ApiOperation({
    summary: 'Publish a comment by id',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The comment was successfully published',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Patch('/publishcommentid/:id')
  async setUserRoleAdminUsername(@Param('id') id: string) {
    return this.commentService.publishComment(id);
  }

  @ApiOperation({
    summary: 'Delete the comment with provided id',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The comment was successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Delete('/byid/:id')
  async deleteCommentById(@Param('id') id: string) {
    return this.commentService.deleteCommentById(id);
  }
}
