import { Role } from '@prisma/client';

interface IUser {
  id: number;
  username: string;
  password: string;
  role: Role;
  email: string;
  name: string;
}

export class User implements IUser {
  id: number;
  username: string;
  password: string;
  role: Role;
  email: string;
  name: string;
}
