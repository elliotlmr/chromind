import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signup: jest.fn(),
    signin: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } }, // Mock basique
        {
          provide: Reflector,
          useValue: { get: jest.fn(), getAllAndOverride: jest.fn() },
        },
      ],
    }).compile();

    controller = moduleRef.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should throw if passwords do not match', async () => {
      await expect(
        controller.signup({
          email: 'test@gmail.com',
          password: '123',
          confirmPassword: '456',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should call authService.signup and return token', async () => {
      mockAuthService.signup.mockResolvedValue({ access_token: 'mock-token' });

      const result = await controller.signup({
        email: 'test@gmail.com',
        password: 'Test123+',
        confirmPassword: 'Test123+',
      });

      expect(mockAuthService.signup).toHaveBeenCalledWith(
        'test@gmail.com',
        'Test123+',
      );
      expect(result).toEqual({ access_token: 'mock-token' });
    });
  });

  describe('signin', () => {
    it('should call authService.signin and return token', async () => {
      mockAuthService.signin.mockResolvedValue({ access_token: 'mock-token' });

      const result = await controller.signin({
        email: 'test@gmail.com',
        password: 'Test123+',
      });

      expect(mockAuthService.signin).toHaveBeenCalledWith(
        'test@gmail.com',
        'Test123+',
      );
      expect(result).toEqual({ access_token: 'mock-token' });
    });
  });
});
