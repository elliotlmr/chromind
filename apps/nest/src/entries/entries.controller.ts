import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { AuthGuard } from '../auth/guards/auth.guard'; // Ensure users are logged in

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Request() req: { user: { id: string } },
    @Body() createEntryDto: CreateEntryDto,
  ) {
    return this.entriesService.createEntry(req.user.id, createEntryDto);
  }

  @Get('user/:userId')
  findUserEntries(@Param('userId') userId: string) {
    return this.entriesService.getUserEntries(userId);
  }
}
