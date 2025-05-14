import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmotionsRecordDto } from './dto/create-emotions-record.dto';
import { EmotionsRecord } from '@prisma/client';
import { GetEmotionsRecordsQueryDto } from './dto/get-emotions-records.dto';

@Injectable()
export class EmotionsRecordsService {
  constructor(private readonly prisma: PrismaService) {}

  async getEmotionsRecords(
    userId: string,
    query: GetEmotionsRecordsQueryDto,
  ): Promise<EmotionsRecord[]> {
    const { startDate, endDate } = query;

    return await this.prisma.emotionsRecord.findMany({
      where: {
        userId,
        createdAt: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        scores: true,
      },
    });
  }

  async createEmotionsRecord(userId: string, dto: CreateEmotionsRecordDto) {
    console.log('USER IS', userId);
    //? Check if the user has already submitted their emotions for today
    const startOfToday = new Date().setHours(0, 0, 0, 0);

    const endOfToday = new Date().setHours(23, 59, 59, 999);

    const existingRecord = await this.prisma.emotionsRecord.findFirst({
      where: {
        userId,
        createdAt: {
          gte: new Date(startOfToday),
          lte: new Date(endOfToday),
        },
      },
    });

    if (existingRecord) {
      throw new ConflictException(
        'You have already submitted your emotions for today.',
      );
    }

    //? Check for duplicate emotions
    const emotionIds = dto.emotions.map((e) => e.emotionId);
    const uniqueEmotionIds = new Set(emotionIds);

    if (emotionIds.length !== uniqueEmotionIds.size) {
      throw new BadRequestException(
        'Each emotion can only be submitted once per day.',
      );
    }

    //? Check if all emotion IDs are valid
    const existingEmotions = await this.prisma.emotion.findMany({
      where: {
        id: { in: emotionIds },
      },
      select: { id: true },
    });

    const foundIds = new Set(existingEmotions.map((e) => e.id));
    const invalidIds = emotionIds.filter((id) => !foundIds.has(id));

    if (invalidIds.length > 0) {
      throw new BadRequestException(
        `The following emotion IDs are invalid: ${invalidIds.join(', ')}`,
      );
    }

    return await this.prisma.emotionsRecord.create({
      data: {
        userId,
        createdAt: new Date(),
        scores: {
          create: dto.emotions.map((emotion) => ({
            emotionId: emotion.emotionId,
            score: emotion.score,
          })),
        },
      },
      include: {
        scores: true,
      },
    });
  }

  async getTodayRecord(userId: string) {
    const todayStart = new Date().setHours(0, 0, 0, 0);

    const todayEnd = new Date().setHours(23, 59, 59, 999);

    const record = await this.prisma.emotionsRecord.findFirst({
      where: {
        userId,
        createdAt: {
          gte: new Date(todayStart),
          lte: new Date(todayEnd),
        },
      },
      include: {
        scores: true,
      },
    });

    return record;
  }

  //? Admin endpoints

  async getUserEmotionsRecords(userId: string): Promise<EmotionsRecord[]> {
    return await this.prisma.emotionsRecord.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  //? Stats endpoints

  async getDailySubmissions() {
    return await this.prisma.emotionsRecord.groupBy({
      by: ['createdAt'],
      _count: true,
      orderBy: { createdAt: 'asc' },
    });
  }
}
