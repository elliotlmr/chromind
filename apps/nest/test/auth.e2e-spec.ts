import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import request from 'supertest';
import { App } from 'supertest/types';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/signup', () => {
    // Delete the test user account if it exists before each test
    beforeEach(async () => {
      const user = await prisma.user.findUnique({
        where: { email: 'test@gmail.com' },
      });

      if (user && process.env.ENVIRONMENT === 'development') {
        await prisma.user.deleteMany({
          where: { email: 'test@gmail.com' },
        });
      }
    });

    if (process.env.ENVIRONMENT === 'development') {
      it('should return 201 and a token when signup is successful', async () => {
        return await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            email: 'test@gmail.com',
            password: 'Test123+',
            confirmPassword: 'Test123+',
          })
          .expect(201);
      });
    }

    it('should throw an error if password is not strong enough', async () => {
      return await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'test@gmail.com',
          password: '123',
          confirmPassword: '123',
        })
        .expect(400);
    });

    it('should throw an error if password and confirmation do not match', async () => {
      return await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'test@gmail.com',
          password: 'Test123+',
          confirmPassword: 'Test123-',
        })
        .expect(400);
    });
  });
});
