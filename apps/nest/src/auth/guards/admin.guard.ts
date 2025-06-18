import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { role?: string };

    if (!user || user.role !== 'ADMIN') {
      throw new ForbiddenException('You do not have admin privileges');
    }

    return true;
  }
}
