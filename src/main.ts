import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  app.enableVersioning();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  buildDocument(app);

  await app.listen(3000);

  const url = await app.getUrl();

  console.log(`Application is running on: ${url}`);
}

bootstrap();

/**
 * Build the Swagger document.
 */
function buildDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Stitch-n-Track API')
    .setDescription('Available API endpoints for Stitch-n-Track')
    .setVersion('1.0')
    .addTag('stitch-n-track')
    .build();

  const options = {};

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document);
}
