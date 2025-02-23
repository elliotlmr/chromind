import { IsString, IsHexColor } from 'class-validator';

export class CreateEmotionDto {
  @IsString()
  name!: string; // e.g., "Happiness"

  @IsHexColor()
  color!: string; // e.g., "#FF5733"
}
