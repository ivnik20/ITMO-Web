import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ReviewDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  review: string;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  bookId: number;

  @ApiProperty()
  @IsNotEmpty()
  userId: number;
}
