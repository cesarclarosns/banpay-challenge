import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({}), UsersModule],
  providers: [
    AuthService,
    AccessTokenStrategy,
    AccessTokenGuard,
    RefreshTokenStrategy,
    RefreshTokenGuard,
  ],
})
export class AuthModule {}
