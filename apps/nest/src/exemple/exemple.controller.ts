import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('exemple')
export class ExempleController {
  @Get()
  findAll(@Req() req: Request): string {
    return 'This action returns all exemples';
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
