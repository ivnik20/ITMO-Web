import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;

@Injectable()
export class AppService {
  async showBookReviews(id: number) {
    const name = await Promise.resolve(
      prisma.book.findUnique({
        where: {
          id: Number(id),
        },
      }),
    ).then((value) => {
      return value.title;
    });
    return { id: id, title: name };
  }
}
