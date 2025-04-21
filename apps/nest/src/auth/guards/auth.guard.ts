import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/utils/isPublic';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.split(' ')[1]; // Extract token
    if (!token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    try {
      const decoded = await this.jwtService.verifyAsync<{
        [key: string]: any;
      }>(token, { secret: process.env.JWT_SECRET });

      console.log('DECODED :', decoded);

      request.user = decoded;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }
}
