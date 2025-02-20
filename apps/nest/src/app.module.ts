import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { ExempleController } from './exemple/exemple.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, ExempleController],
  providers: [AppService],
})
export class AppModule {}
