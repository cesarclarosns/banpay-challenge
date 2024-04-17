import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { randomUUID } from 'crypto';
import { LoggerModule } from 'nestjs-pino';

import { settings } from './config/settings';
import { AuthModule } from './modules/auth/auth.module';
import { AccessTokenGuard } from './modules/auth/guards';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { StudioGhibliModule } from './modules/studio-ghibli/studio-ghibli.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  controllers: [],
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: (request) =>
          request.headers['x-correlation-id'] || randomUUID(),
        level: process.env.NODE_ENV !== 'prod' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'prod'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        { limit: settings.THROTTLER.LIMIT, ttl: settings.THROTTLER.TTL },
      ],
    }),
    MongooseModule.forRoot(settings.DATABASE.MONGODB_URI),
    UsersModule,
    AuthModule,
    StudioGhibliModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: AccessTokenGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
