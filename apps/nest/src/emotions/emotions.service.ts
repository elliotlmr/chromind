import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { Emotion } from '@prisma/client';

@Injectable()
export class EmotionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllEmotions(): Promise<Emotion[]> {
    return this.prisma.emotion.findMany();
  }

  async createEmotion(dto: CreateEmotionDto) {
    return this.prisma.emotion.create({ data: dto });
  }
}
