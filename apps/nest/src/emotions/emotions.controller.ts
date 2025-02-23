import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { AdminGuard } from '../auth/admin.guard';

@Controller('emotions')
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) {}

  @Get()
  findAll() {
    return this.emotionsService.getAllEmotions();
  }

  @Post()
  @UseGuards(AdminGuard) // Only for admins
  create(@Body() createEmotionDto: CreateEmotionDto) {
    return this.emotionsService.createEmotion(createEmotionDto);
  }
}
