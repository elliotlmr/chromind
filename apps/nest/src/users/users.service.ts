import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async getDailyAccountCreations() {
    return this.prisma.user.groupBy({
      by: ['createdAt'],
      _count: true,
      orderBy: { createdAt: 'asc' },
    });
  }

  async getMonthlyAccountCreations() {
    const dailyAccountCreations = await this.getDailyAccountCreations();

    const monthlyAccountCreations = dailyAccountCreations.reduce(
      (acc, entry) => {
        const monthKey = format(entry.createdAt, 'yyyy-MM'); // e.g. "2025-01"

        if (!acc[monthKey]) {
          acc[monthKey] = 0;
        }

        acc[monthKey] += entry._count;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Convert to array for frontend
    const result = Object.entries(monthlyAccountCreations).map(
      ([month, count]) => ({
        month,
        count,
      }),
    );

    return result;
  }

  async getUsersCount() {
    return this.prisma.user.count();
  }
}
