import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { EmotionsRecordsService } from './emotions-records.service';
import { CreateEmotionsRecordDto } from './dto/create-emotions-record.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthenticatedRequest } from 'src/auth/dto/authenticated-request.dto';
import { GetEmotionsRecordsQueryDto } from './dto/get-emotions-records.dto';

@Controller('emotions-records')
export class EmotionsRecordsController {
  constructor(
    private readonly emotionsRecordsService: EmotionsRecordsService,
  ) {}

  @Get()
  getEmotionsRecords(
    @Req() req: AuthenticatedRequest,
    @Query() query: GetEmotionsRecordsQueryDto,
  ) {
    return this.emotionsRecordsService.getEmotionsRecords(req.user.sub, query);
  }

  @Post()
  createEmotionsRecord(
    @Request() req: AuthenticatedRequest,
    @Body() createEntryDto: CreateEmotionsRecordDto,
  ) {
    return this.emotionsRecordsService.createEmotionsRecord(
      req.user.sub,
      createEntryDto,
    );
  }

  //? Admin endpoints

  @UseGuards(AdminGuard)
  @Get('user/:userId')
  getUserEmotionsRecords(@Param('userId') userId: string) {
    return this.emotionsRecordsService.getUserEmotionsRecords(userId);
  }

  //? Stats endpoints

  @UseGuards(AdminGuard)
  @Get('stats/daily-submissions')
  async getDailySubmissions() {
    return await this.emotionsRecordsService.getDailySubmissions();
  }
}
