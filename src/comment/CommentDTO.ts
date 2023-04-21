import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  content: string | null;

  published: boolean | null;

  @ApiProperty()
  authorId: number | null;

  @ApiProperty()
  categoryTitle: string;
  @ApiProperty()
  date: Date;
}
