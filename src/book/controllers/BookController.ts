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
import { BookService } from '../services/BookService';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookDTO as BookModel } from '../BookDTO';

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
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
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
    status: 201,
    description: 'The book was successfully provided',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Get('/bybookname/:bookname')
  async getBookByBookname(
    @Param('bookname') bookname: string,
  ): Promise<BookModel> {
    return this.bookService.findBookBookname(bookname);
  }

  @ApiOperation({
    summary: 'Get book by id',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'The book was successfully provided',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Get('/byid/:id')
  async getBookById(@Param('id') id: string): Promise<BookModel> {
    return this.bookService.findBookId(id);
  }

  @ApiOperation({
    summary: 'Get all approved books',
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
  @Get('getallapproved')
  async getPublishedPosts(): Promise<BookModel[]> {
    return this.bookService.approved();
  }

  @ApiOperation({
    summary: 'Approve and publish suggested book by id',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The book was successfully approved',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Patch('/approvebookid/:id:adminId')
  async setUserRoleAdminUsername(@Param('id') id: string, @Param('adminId') adminId: string) {
    return this.bookService.approveBook(id, adminId);
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
  @Delete('/bybookname/:bookname')
  async deleteBookByBookname(@Param('bookname') bookname: string) {
    return this.bookService.deleteBookByBookname(bookname);
  }

  @ApiOperation({
    summary: 'Delete the book with provided id',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The book was successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Delete('/byid/:id')
  async deleteBookById(@Param('id') id: string) {
    return this.bookService.deleteBookById(id);
  }
}
