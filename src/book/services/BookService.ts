import { Category, PrismaClient } from '@prisma/client';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { BookDTO as BookModel } from '../BookDTO';

const prisma = new PrismaClient();
export default prisma;

@Injectable()
export class BookService {
  public createBook(body: BookModel) {
    const id = body.id;
    const title = body.title;
    const bookAuthor = body.bookAuthor;
    const authorId = body.authorId;
    const comment = body.comment;
    const approved = false;
    const categoryTitle = body.categoryTitle;
    const adminId = body.adminId;
    try {
      const book = prisma.book.create({
        data: {
          id,
          title,
          bookAuthor,
          authorId,
          comment,
          approved,
          adminId,
          categoryTitle,
        },
      });
      return book;
    } catch (e) {
      return e;
    }
  }

  public findBookBookname(bookname: string) {
    const str = String(bookname);
    const book = prisma.book.findFirst({
      where: {
        title: str,
      },
    });
    return book;
  }

  public findBookId(id: string) {
    const num = Number(id);
    return prisma.book.findUnique({
      where: {
        id: num,
      },
    });
  }

  async deleteBookByBookname(bookname: string) {
    const book = await prisma.book.deleteMany({
      where: {
        title: bookname,
      },
    });
  }

  async deleteBookById(id) {
    id = Number(id);
    const book = await prisma.book.delete({
      where: {
        id,
      },
    });
  }

  async approveBook(id: string, adminId: string) {
    const num = Number(id);
    const book = await prisma.book.update({
      where: {
        id: num,
      },
      data: {
        approved: true,
        adminId: Number(adminId),
      },
    });
  }

  async approved() {
    return prisma.book.findMany({
      where: {
        approved: true,
      },
    });
  }
}
