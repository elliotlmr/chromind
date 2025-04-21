import {
  IsArray,
  IsInt,
  IsString,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Emotion } from '@prisma/client';

class EmotionScoreDto {
  @IsString()
  emotionId!: Emotion['id']; // e.g., "happiness"

  @IsInt()
  @Min(0)
  @Max(10)
  score!: number; // e.g., 8
}

export class CreateEmotionsRecordDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionScoreDto)
  emotions: EmotionScoreDto[] = [];
}
