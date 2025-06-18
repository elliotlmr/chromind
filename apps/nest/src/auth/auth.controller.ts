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
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';
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
  @Post('sign-up')
  async signup(@Body() signUpDto: SignUpDto, @Res({passthrough: true}) res: Response) {
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

    const responseObject = await this.authService.signup(signUpDto.email, signUpDto.password);

    if (!responseObject) {
      throw new UnauthorizedException('Invalid credentials');
    }

    res.cookie('token', responseObject.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return responseObject;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signin(@Body() signInDto: SignInDto, @Res({passthrough: true}) res: Response) {
    if (!signInDto.email || !signInDto.password) {
      throw new UnauthorizedException(
        'Invalid email, password or password confirmation.',
      );
    }

    const responseObject = await this.authService.signin(
      signInDto.email,
      signInDto.password,
    );

    if (!responseObject) {
      throw new UnauthorizedException('Invalid credentials');
    }

    res.cookie('token', responseObject.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return responseObject;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  async signout(@Res({passthrough: true}) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
      maxAge: 0,
    });
    return { message: 'Signed out successfully' };
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
