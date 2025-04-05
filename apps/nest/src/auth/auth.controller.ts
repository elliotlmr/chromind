import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { sign } from 'crypto';

@UseInterceptors(TokenInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    if (!signUpDto.email || !signUpDto.password || !signUpDto.confirmPassword) {
      throw new UnauthorizedException(
        'Invalid email, password or password confirmation.',
      );
    }

    if (signUpDto.password !== signUpDto.confirmPassword) {
      throw new UnauthorizedException(
        'Password does not match password confirmation.',
      );
    }

    return await this.authService.signup(signUpDto.email, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signInDto: SignUpDto) {
    if (!signInDto.email || !signInDto.password) {
      throw new UnauthorizedException(
        'Invalid email, password or password confirmation.',
      );
    }

    return await this.authService.signin(signInDto.email, signInDto.password);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: Request) {
    return req.user;
  }

  @Get('hello')
  @UseGuards(AuthGuard)
  hello() {
    return 'HELLO';
  }

  @Get('helloadmin')
  @UseGuards(AdminGuard)
  helloadmin() {
    return 'HELLO';
  }
}
