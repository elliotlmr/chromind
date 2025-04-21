import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EmotionsRecordsService } from './emotions-records.service';
import { CreateEmotionsRecordDto } from './dto/create-emotions-record.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthenticatedRequest } from 'src/auth/dto/authenticated-request.dto';

@Controller('emotions-records')
export class EmotionsRecordsController {
  constructor(
    private readonly emotionsRecordsService: EmotionsRecordsService,
  ) {}

  @Get()
  findEmotionsRecords(@Req() req: AuthenticatedRequest) {
    return this.emotionsRecordsService.getEmotionsRecords(req.user.sub);
  }

  @Post()
  create(
    @Request() req: { user: { id: string } },
    @Body() createEntryDto: CreateEmotionsRecordDto,
  ) {
    return this.emotionsRecordsService.createEmotionsRecord(
      req.user.id,
      createEntryDto,
    );
  }

  //? Admin endpoints

  @UseGuards(AdminGuard)
  @Get('user/:userId')
  findUserEmotionsRecords(@Param('userId') userId: string) {
    return this.emotionsRecordsService.getUserEmotionsRecords(userId);
  }

  //? Stats endpoints

  @UseGuards(AdminGuard)
  @Get('stats/daily-submissions')
  async getDailySubmissions() {
    return await this.emotionsRecordsService.getDailySubmissions();
  }
}
