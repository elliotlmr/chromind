import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { Emotion } from '@prisma/client';

@Injectable()
export class EmotionsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get a all emotions with translations
   * @param language - Optional: filter by language
   */
  async getAllEmotions(language?: string): Promise<Emotion[]> {
    return this.prisma.emotion.findMany({
      include: {
        translations: language
          ? { where: { language }, select: { name: true } }
          : true,
      },
    });
  }

  /**
   * Create an emotion with translations
   * @param dto - CreateEmotionDto
   */
  async createEmotion(dto: CreateEmotionDto) {
    return this.prisma.emotion.create({
      data: {
        color: dto.color,
        translations: {
          create: dto.translations.map((t) => ({
            language: t.language,
            name: t.name,
          })),
        },
      },
      include: { translations: true },
    });
  }

  /**
   * Get a single emotion by ID with translations
   * @param id - Emotion ID
   * @param language - Optional: filter by language
   */
  async getEmotionById(id: string, language?: string) {
    return this.prisma.emotion.findUnique({
      where: { id },
      include: {
        translations: language
          ? { where: { language }, select: { name: true } }
          : true,
      },
    });
  }
}
