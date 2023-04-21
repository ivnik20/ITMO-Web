import { PrismaClient } from '@prisma/client';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { CommentDTO as CommentModel } from '../CommentDTO';

const prisma = new PrismaClient();
export default prisma;

@Injectable()
export class CommentService {
  public createComment(body: CommentModel) {
    const id = body.id;
    const date = body.date;
    const categoryTitle = body.categoryTitle;
    const authorId = body.authorId;
    const content = body.content;
    try {
      const commentObj = prisma.comment.create({
        data: {
          id,
          content,
          date,
          categoryTitle,
          authorId,
        },
      });
      return commentObj;
    } catch (e) {
      return e;
    }
  }

  public findCommentId(id: string) {
    const num = Number(id);
    return prisma.comment.findUnique({
      where: {
        id: num,
      },
    });
  }

  async deleteCommentById(id) {
    id = Number(id);
    const comment = await prisma.comment.delete({
      where: {
        id,
      },
    });
  }

  async publishComment(id: string) {
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
}
