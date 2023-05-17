import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDTO {
  @ApiProperty()
  content: string | null;

  published: boolean | null;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  authorId: number | null;

  @ApiProperty()
  @IsNotEmpty()
  categoryTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;
}
