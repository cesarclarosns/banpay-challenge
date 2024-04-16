import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
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
        level: 'trace',
        transport: {
          target: 'pino-pretty',
        },
      },
      useExisting: true,
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
