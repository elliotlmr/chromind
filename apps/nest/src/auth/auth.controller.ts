import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';

@UseInterceptors(TokenInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: { email: string; password: string }) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('signin')
  signin(@Body() body: { email: string; password: string }) {
    return this.authService.signin(body.email, body.password);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request) {
    return req.user;
  }
}
