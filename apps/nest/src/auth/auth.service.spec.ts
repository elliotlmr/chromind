import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
// import { AuthServiceMock } from './mocks/auth.service.mock';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let prisma: {
    user: {
      create: jest.Mock<any, any, any>;
      findUnique: jest.Mock<any, any, any>;
    };
  };
  let jwt: Partial<JwtService>;

  beforeEach(async () => {
    prisma = {
      user: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    jwt = {
      signAsync: jest.fn().mockResolvedValue('mocked-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should create a user and return a token', async () => {
      const email = 'test@gmail.com';
      const password = 'Test123+';

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      prisma.user.create.mockResolvedValue({
        id: 'user-id',
        email,
        password: 'hashed-password',
        role: 'USER',
      });

      const result = await service.signup(email, password);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: { email, password: 'hashed-password' },
      });
      expect(jwt.signAsync).toHaveBeenCalledWith({
        sub: 'user-id',
        email,
        role: 'USER',
      });
      expect(result).toEqual({ access_token: 'mocked-jwt-token' });
    });
  });

  describe('signin', () => {
    it('should return a token if credentials are valid', async () => {
      const email = 'test@example.com';
      const password = '123456';

      prisma.user.findUnique.mockResolvedValue({
        id: 'user-id',
        email,
        password: 'hashed-password',
        role: 'USER',
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.signin(email, password);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashed-password');
      expect(jwt.signAsync).toHaveBeenCalledWith({
        sub: 'user-id',
        email,
        role: 'USER',
      });
      expect(result).toEqual({ access_token: 'mocked-jwt-token' });
    });

    it('should throw if user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.signin('no@user.com', 'pass')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw if password is invalid', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-id',
        email: 'user@example.com',
        password: 'hashed-password',
        role: 'USER',
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.signin('user@example.com', 'wrongpass'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
