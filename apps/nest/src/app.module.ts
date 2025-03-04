import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { ExempleController } from './exemple/exemple.controller';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { EmotionsController } from './emotions/emotions.controller';
import { EmotionsService } from './emotions/emotions.service';
import { EmotionsModule } from './emotions/emotions.module';
import { EntriesController } from './entries/entries.controller';
import { EntriesService } from './entries/entries.service';
import { EntriesModule } from './entries/entries.module';
import { AdminGuard } from './auth/guards/admin.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    EmotionsModule,
    EntriesModule,
  ],
  exports: [PrismaService],
  controllers: [
    AppController,
    AuthController,
    ExempleController,
    EmotionsController,
    EntriesController,
  ],
  providers: [
    AppService,
    AdminGuard,
    AuthGuard,
    JwtService,
    PrismaService,
    JwtStrategy,
    EmotionsService,
    EntriesService,
  ],
})
export class AppModule {}
