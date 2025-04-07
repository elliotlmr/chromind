import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AppService } from 'src/app.service';

@Controller('exemple')
export class ExempleController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(@Req() req: Request): string {
    return 'This action returns all exemples' + req.body;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} exemple`;
  }

  @Post()
  @HttpCode(201)
  create(): string {
    return 'This action adds a new exemple';
  }
}
