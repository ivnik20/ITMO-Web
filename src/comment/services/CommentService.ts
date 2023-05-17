import { PrismaClient } from '@prisma/client';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { CommentDTO as CommentModel } from '../CommentDTO';

const prisma = new PrismaClient();
export default prisma;

@Injectable()
export class CommentService {
  public createComment(body: CommentModel) {
    const date = body.date;
    const categoryTitle = body.categoryTitle;
    const authorId = body.authorId;
    const content = body.content;
    const published = true;
    try {
      const commentObj = prisma.comment.create({
        data: {
          content,
          date,
          categoryTitle,
          authorId,
          published,
        },
      });
      return commentObj;
    } catch (e) {
      return e;
    }
  }

  public findCommentId(id: number) {
    return prisma.comment.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteCommentById(id: number) {
    const comment = await prisma.comment.delete({
      where: {
        id,
      },
    });
  }

  async publishComment(id: number) {
    const num = Number(id);
    const comment = await prisma.comment.update({
      where: {
        id: num,
      },
      data: {
        published: true,
      },
    });
  }

  async published() {
    return prisma.comment.findMany({
      where: {
        published: true,
      },
    });
  }

  async publishedForCategory(title: string) {
    return prisma.comment.findMany({
      where: {
        published: true,
        categoryTitle: title,
      },
    });
  }
}
