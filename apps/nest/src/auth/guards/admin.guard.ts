import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException('Missing authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new ForbiddenException('Invalid authorization format');
    }

    try {
      const decoded = await this.jwtService.verifyAsync<{ role: string }>(
        token,
        {
          secret: process.env.JWT_SECRET,
        },
      );

      if (decoded.role !== 'ADMIN') {
        throw new ForbiddenException('You do not have admin privileges');
      }
      request.user = decoded; // Attach user to request
      return true;
    } catch {
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}
