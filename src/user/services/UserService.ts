import { PrismaClient } from '@prisma/client';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { UserDTO as UserModel } from '../UserDTO';

const prisma = new PrismaClient();
export default prisma;

@Injectable()
export class UserService {
  public createUser(body: { supertoken: string; name: string; email: string }) {
    const email = body.email;
    const name = body.name;
    const supertoken = body.supertoken;
    try {
      const user = prisma.user.create({
        data: {
          email,
          name,
          supertoken,
          role: 'ADMIN',
        },
      });
      return user;
    } catch (e) {
      return e;
    }
  }

  public findUserUsername(username: string) {
    const str = String(username);
    const user = prisma.user.findFirst({
      where: {
        name: str,
      },
    });
    return user;
  }

  public findUserId(id: number) {
    const num = Number(id);
    return prisma.user.findUnique({
      where: {
        id: num,
      },
    });
  }

  async setAdminRoleUsername(username: string) {
    const str = String(username);
    const user = await prisma.user.updateMany({
      where: {
        name: str,
      },
      data: {
        role: 'ADMIN',
      },
    });
  }

  async setAdminRoleId(id: number) {
    const num = Number(id);
    const user = await prisma.user.update({
      where: {
        id: num,
      },
      data: {
        role: 'ADMIN',
      },
    });
  }

  async setClientRoleUsername(username: string) {
    const str = String(username);
    const user = await prisma.user.updateMany({
      where: {
        name: str,
      },
      data: {
        role: 'USER',
      },
    });
  }

  async setClientRoleId(id: number) {
    const num = Number(id);
    const user = await prisma.user.update({
      where: {
        id: num,
      },
      data: {
        role: 'USER',
      },
    });
  }

  async deleteUserByUsername(username: string) {
    const user = await prisma.user.deleteMany({
      where: {
        name: username,
      },
    });
  }

  async deleteUserById(id) {
    id = Number(id);
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async getUserIdBySupertokensId(id) {
    return prisma.user.findUnique({
      where: {
        supertoken: id,
      },
    });
  }
}
