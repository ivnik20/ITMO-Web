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
} from '@nestjs/common';
import { BookService } from '../services/BookService';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookDTO as BookModel } from '../BookDTO';
import { Period } from '@prisma/client';

@ApiTags('Book')
@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({
    summary: 'Create book',
  })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
    type: BookModel,
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
  async create(@Body() body: BookModel): Promise<BookModel> {
    return this.bookService.createBook(body);
  }

  @ApiOperation({
    summary: 'Get book by bookname',
  })
  @ApiParam({ name: 'bookname', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The book was successfully provided',
    type: BookModel,
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
  @Get('name/:bookname')
  async getBookByBookname(
    @Param('bookname') bookname: string,
  ): Promise<BookModel> {
    return this.bookService.findBookBookname(bookname);
  }

  @ApiOperation({
    summary: 'Get books for period',
  })
  @ApiParam({ name: 'period', enum: Period })
  @ApiResponse({
    status: 200,
    description: 'Books were successfully provided',
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
  @Get('period/:period')
  async getBooksByPeriod(
    @Param('period') period: Period,
  ): Promise<BookModel[]> {
    return this.bookService.forPeriod(period);
  }

  @ApiOperation({
    summary: 'Get book by id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The book was successfully provided',
    type: BookModel,
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
  @Get('id/:id')
  async getBookById(@Param('id', ParseIntPipe) id: number): Promise<BookModel> {
    return this.bookService.findBookId(id);
  }

  @ApiOperation({
    summary: 'Get all approved books',
  })
  @ApiResponse({
    status: 200,
    description: 'Books were successfully provided',
    type: BookModel,
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
  @Get('/books/all')
  async getApproved(): Promise<BookModel[]> {
    return this.bookService.approved();
  }

  @ApiOperation({
    summary: 'Approve and publish suggested book by id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The book was successfully approved',
    type: BookModel,
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
  @Patch('id/:id/:adminId')
  async setUserRoleAdminUsername(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.approveBook(id, 0);
  }

  @ApiOperation({
    summary: 'Delete book with provided bookname',
  })
  @ApiParam({ name: 'bookname', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The book was successfully deleted',
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
  @Delete('name/:bookname')
  async deleteBookByBookname(@Param('bookname') bookname: string) {
    return this.bookService.deleteBookByBookname(bookname);
  }

  @ApiOperation({
    summary: 'Delete the book with provided id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The book was successfully deleted',
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
  @Delete('id/:id')
  async deleteBookById(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.deleteBookById(id);
  }
}
