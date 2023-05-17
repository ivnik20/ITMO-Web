import { Category, PrismaClient } from '@prisma/client';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { ReviewDTO as ReviewModel } from '../ReviewDTO';

const prisma = new PrismaClient();
export default prisma;

@Injectable()
export class ReviewService {
  public createReview(body: ReviewModel) {
    const rating = body.rating;
    const review = body.rev;
    const date = body.date;
    const bookId = body.bookId;
    const userId = body.userId;
    try {
      const reviewObj = prisma.review.create({
        data: {
          rating,
          review,
          date,
          bookId,
          userId,
        },
      });
      return reviewObj;
    } catch (e) {
      return e;
    }
  }

  public findReviewId(id: number) {
    return prisma.review.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteReviewById(id: number) {
    const review = await prisma.review.delete({
      where: {
        id,
      },
    });
  }

  async findReviewsForBook(bookId: number) {
    return prisma.review.findMany({
      where: {
        bookId: bookId,
      },
    });
  }
}
