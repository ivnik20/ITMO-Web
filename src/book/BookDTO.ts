import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class BookDTO {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  bookAuthor: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  authorId: number | null;

  @ApiProperty()
  comment: string | null;

  @ApiProperty()
  categoryTitle: string;

  approved: boolean;

  adminId: number | null;
}
