import { TokenPayload } from '@/modules/auth/types/token-payload';

declare module 'express-serve-static-core' {
  interface Request {
    user: TokenPayload;
  }
}

export {};
