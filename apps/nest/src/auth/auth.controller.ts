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
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request } from 'express';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { AdminGuard } from './guards/admin.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { IsPublic } from 'src/utils/isPublic';
import { SignInDto } from './dto/sign-in.dto';

@UseInterceptors(TokenInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublic()
  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    if (!signUpDto.email || !signUpDto.password || !signUpDto.confirmPassword) {
      throw new BadRequestException(
        'Missing email, password or password confirmation.',
      );
    }

    if (signUpDto.password !== signUpDto.confirmPassword) {
      throw new BadRequestException(
        'Password does not match password confirmation.',
      );
    }

    return await this.authService.signup(signUpDto.email, signUpDto.password);
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    if (!signInDto.email || !signInDto.password) {
      throw new UnauthorizedException(
        'Invalid email, password or password confirmation.',
      );
    }

    return await this.authService.signin(signInDto.email, signInDto.password);
  }

  @Get('me')
  me(@Req() req: Request) {
    return req.user;
  }

  @Get('hello')
  hello() {
    return 'HELLO';
  }

  @Get('helloadmin')
  @UseGuards(AdminGuard)
  helloadmin() {
    return 'HELLO';
  }
}
