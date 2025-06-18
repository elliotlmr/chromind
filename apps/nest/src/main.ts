import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {  
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Chromind API')
    .setDescription('The API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build();

  const custom: SwaggerCustomOptions = {
    customSiteTitle: 'API | Chromind',
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: '/assets/favicon.ico',
  };

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, documentFactory, custom);

  await app.listen(process.env.PORT ?? 3000);

  console.log('API is running on: ', await app.getUrl());
}
void bootstrap();
