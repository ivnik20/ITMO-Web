import { Category, PrismaClient } from '@prisma/client';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { ReviewDTO as ReviewModel } from '../ReviewDTO';

const prisma = new PrismaClient();
export default prisma;

@Injectable()
export class ReviewService {
  public createReview(body: ReviewModel) {
    const id = body.id;
    const rating = body.rating;
    const review = body.review;
    const date = body.date;
    const bookId = body.bookId;
    const userId = body.userId;
    //const book = body.book;
    //const user = body.user;
    try {
      const reviewObj = prisma.review.create({
        data: {
          id,
          rating,
          review,
          date,
          bookId,
          userId,
          //book,
          //user,
        },
      });
      return reviewObj;
    } catch (e) {
      return e;
    }
  }

  public findReviewId(id: string) {
    const num = Number(id);
    return prisma.review.findUnique({
      where: {
        id: num,
      },
    });
  }

  async deleteReviewById(id) {
    id = Number(id);
    const review = await prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
