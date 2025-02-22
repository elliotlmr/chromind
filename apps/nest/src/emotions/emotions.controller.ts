import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { EmotionsService } from './emotions.service';

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
