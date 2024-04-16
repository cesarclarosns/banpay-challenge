import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

import { AppModule } from '@/app.module';
import { CorsError } from '@/common/errors/cors.error';
import { AxiosExceptionFilter } from '@/common/libs/filters/axios-exception.filter';
import { CorsExceptionFilter } from '@/common/libs/filters/cors-exception.filter';
import { MongooseExceptionFilter } from '@/common/libs/filters/mongoose-exception.filter';
import { settings } from '@/config/settings';
import { AUTH_COOKIES } from '@/modules/auth/constants/auth-cookies';
import { AUTH_TOKENS } from '@/modules/auth/constants/auth-tokens';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Set logger
  app.useLogger(app.get(Logger));

  // Set CORS
  const allowedOrigins = settings.CORS.ALLOWED_ORIGINS.split(',');

  app.enableCors({
    credentials: true,
    origin: (origin, cb) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        return cb(null, true);
      }
      return cb(new CorsError('Not allowed by CORS.'));
    },
  });

  // Set middlewares
  app.setGlobalPrefix(settings.API.PREFIX);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(
    new MongooseExceptionFilter(),
    new CorsExceptionFilter(),
    new AxiosExceptionFilter(),
  );

  app.use(helmet());
  app.use(cookieParser());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Set Swagger Docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('RESTful API')
    .setVersion('1.0')
    .addCookieAuth(
      AUTH_COOKIES.refreshToken,
      {
        in: 'cookie',
        name: AUTH_COOKIES.refreshToken,
        type: 'apiKey',
      },
      AUTH_COOKIES.refreshToken,
    )
    .addBearerAuth(
      {
        in: 'header',
        name: AUTH_TOKENS.accessToken,
        scheme: 'bearer',
        type: 'http',
      },
      AUTH_TOKENS.accessToken,
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${settings.API.PREFIX}/docs`, app, swaggerDocument);

  // Start app
  app.setGlobalPrefix(settings.API.PREFIX);
  await app.listen(settings.API.LISTENING_PORT);
}
bootstrap();
