import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BookDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  bookAuthor: string;

  @ApiProperty()
  authorId: number | null;

  @ApiProperty()
  comment: string | null;

  @ApiProperty()
  categoryTitle: string;

  approved: boolean;
  adminId: number | null;
}
