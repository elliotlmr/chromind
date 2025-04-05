import { Type } from 'class-transformer';
import { IsString, IsHexColor, IsArray, ValidateNested } from 'class-validator';

export class CreateEmotionDto {
  @IsHexColor()
  color!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionTranslationDto)
  translations!: EmotionTranslationDto[];
}

export class EmotionTranslationDto {
  @IsString()
  language!: string; // e.g., "en", "fr"

  @IsString()
  name!: string; // e.g., "Joy", "Joie"
}
