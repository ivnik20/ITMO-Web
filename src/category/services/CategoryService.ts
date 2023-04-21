import { Period, PrismaClient } from '@prisma/client';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { CategoryDTO as CategoryModel } from '../CategoryDTO';

const prisma = new PrismaClient();
export default prisma;

@Injectable()
export class CategoryService {
  public createCategory(body: CategoryModel) {
    const title = body.title;
    const period = body.period;
    try {
      const category = prisma.category.create({
        data: {
          title,
          period,
          //book,
          //user,
        },
      });
      return category;
    } catch (e) {
      return e;
    }
  }

  public findCategoryTitle(name: string) {
    const tit = String(name);
    return prisma.category.findUnique({
      where: {
        title: tit,
      },
    });
  }

  async deleteCategoryByTitle(name) {
    const title = String(name);
    const category = await prisma.category.delete({
      where: {
        title,
      },
    });
  }
}
