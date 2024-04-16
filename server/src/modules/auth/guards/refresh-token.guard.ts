import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AUTH_STRATEGIES } from '../constants/auth-strategies';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(
  AUTH_STRATEGIES.refreshToken,
) {}
