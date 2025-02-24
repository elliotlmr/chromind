import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data: { access_token?: string }) => {
        if (data && data.access_token) {
          response.setHeader('x-access-token', data.access_token);
        }
        return data;
      }),
    );
  }
}
