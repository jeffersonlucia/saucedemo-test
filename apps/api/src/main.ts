import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 3000);

  app.use(helmet());
  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN', '*'),
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Whiskey Club OS API')
    .setDescription('API MVP para o tenant piloto Bar do Jao.')
    .setVersion('0.1.0')
    .addBearerAuth()
    .addGlobalParameters({
      name: 'X-Tenant-Slug',
      in: 'header',
      required: false,
      description: 'Tenant ativo, por exemplo bar-do-jao.',
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}

void bootstrap();
