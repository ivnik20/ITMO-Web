import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string | null;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  role: Role;
}
