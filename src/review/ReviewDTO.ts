import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class ReviewDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  review: string;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
