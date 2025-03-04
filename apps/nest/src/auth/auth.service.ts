import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from '@prisma/client';

type JwtPayload = {
  sub: string;
  email: string;
  role: Role;
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    console.log(email, password);
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prisma.user
      .create({
        data: { email, password: hashedPassword },
      })
      .then((data) => {
        if (data) {
          console.log('User created successfully');
        }
        return this.generateToken(data.id, data.email, data.role);
      })
      .catch((error) => {
        throw error;
      });
  }

  async signin(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return this.generateToken(user.id, user.email, user.role);
  }

  async validateOAuthUser(user: User) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user.id, user.email, user.role);
  }

  generateToken(
    userId: string,
    email: string,
    role: Role,
  ): { access_token: string } {
    const payload: JwtPayload = { sub: userId, email, role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
