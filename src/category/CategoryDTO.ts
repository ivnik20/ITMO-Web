import { Category } from '@prisma/client';
import { User } from '../user/entities/User';
import { Period } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  period: Period;
}
