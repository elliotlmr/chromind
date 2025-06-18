import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request } from 'express';

@Controller('emotions')
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) {}

  @Get()
  findAll(@Req() req: Request) {
    console.log(req.headers);
    return this.emotionsService.getAllEmotions();
  }

  @Post()
  create(@Body() createEmotionDto: CreateEmotionDto) {
    return this.emotionsService.createEmotion(createEmotionDto);
  }
}
