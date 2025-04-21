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
import { EmotionsRecordsController } from './emotions-records/emotions-records.controller';
import { EmotionsRecordsService } from './emotions-records/emotions-records.service';
import { EntriesModule } from './emotions-records/emotions-records.module';
import { AdminGuard } from './auth/guards/admin.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    EmotionsModule,
    EntriesModule,
    UsersModule,
  ],
  exports: [PrismaService],
  controllers: [
    AppController,
    AuthController,
    ExempleController,
    EmotionsController,
    EmotionsRecordsController,
    UsersController,
  ],
  providers: [
    AppService,
    AdminGuard,
    AuthGuard,
    JwtService,
    PrismaService,
    JwtStrategy,
    EmotionsService,
    EmotionsRecordsService,
    UsersService,
  ],
})
export class AppModule {}
