import { Category, Period, PrismaClient } from '@prisma/client';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { BookDTO as BookModel } from '../BookDTO';

const prisma = new PrismaClient();
export default prisma;

@Injectable()
export class BookService {
  public createBook(body: BookModel) {
    const title = body.title;
    const bookAuthor = body.bookAuthor;
    const authorId = body.authorId;
    const comment = body.comment;
    const approved = body.approved;
    const categoryTitle = body.categoryTitle;
    const adminId = body.adminId;
    try {
      const book = prisma.book.create({
        data: {
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
    const book = prisma.book.findFirst({
      where: {
        title: bookname,
      },
    });
    return book;
  }

  public findBookId(id: number) {
    return prisma.book.findUnique({
      where: {
        id: id,
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

  async approveBook(id: number, adminId: number) {
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
  async notApproved() {
    return prisma.book.findMany({
      where: {
        approved: false,
      },
    });
  }

  async forPeriod(per: Period) {
    return prisma.book.findMany({
      where: {
        approved: true,
        category: {
          period: per,
        },
      },
    });
  }
}
