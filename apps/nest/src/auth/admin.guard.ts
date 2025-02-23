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

  canActivate(context: ExecutionContext): boolean {
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
      const decoded = this.jwtService.verify<{ role: string }>(token);
      if (decoded.role !== 'ADMIN') {
        throw new ForbiddenException('You do not have admin privileges');
      }
      request.user = decoded; // Attach user to request
      return true;
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}
