import {
  IsArray,
  IsInt,
  IsString,
  Min,
  Max,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class EmotionScoreDto {
  @IsString()
  emotion!: string; // e.g., "happiness"

  @IsInt()
  @Min(0)
  @Max(10)
  score!: number; // e.g., 8
}

export class CreateEntryDto {
  @IsDateString()
  date!: string; // e.g., "2024-02-21"

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionScoreDto)
  emotions: EmotionScoreDto[] = [];
}
