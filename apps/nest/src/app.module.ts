import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { ExempleController } from './exemple/exemple.controller';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  exports: [PrismaService],
  controllers: [AppController, AuthController, ExempleController],
  providers: [AppService, PrismaService, JwtStrategy],
})
export class AppModule {}
