import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AdminGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  //? Stats endpoints

  @Get('stats/daily-account-creations')
  async getDailyAccountCreations() {
    return await this.usersService.getDailyAccountCreations();
  }

  @Get('stats/monthly-account-creations')
  async getMonthlyAccountCreations() {
    return await this.usersService.getMonthlyAccountCreations();
  }

  @Get('stats/count')
  async getUsersCount() {
    return await this.usersService.getUsersCount();
  }
}
