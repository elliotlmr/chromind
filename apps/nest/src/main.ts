import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  SwaggerModule.setup('api', app, documentFactory, custom);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
