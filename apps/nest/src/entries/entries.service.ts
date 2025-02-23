import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { Entry } from '@prisma/client';

@Injectable()
export class EntriesService {
  constructor(private readonly prisma: PrismaService) {}

  async createEntry(userId: string, dto: CreateEntryDto) {
    return this.prisma.entry.create({
      data: {
        userId,
        date: new Date(dto.date),
        scores: JSON.stringify(dto.emotions), // Store as JSON
      },
    });
  }

  async getUserEntries(userId: string): Promise<Entry[]> {
    return this.prisma.entry.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }
}
