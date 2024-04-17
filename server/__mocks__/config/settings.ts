import { Settings } from '@/config/settings';

jest.mock('@/config/settings', () => ({
  settings: {
    API: { LISTENING_PORT: 3000, PREFIX: '/api' },
    AUTH: {
      JWT_ACCESS_EXPIRE_MINUTES: 5,
      JWT_ACCESS_SECRET: 'JWT_ACCESS_SECRET',
      JWT_REFRESH_EXPIRE_MINUTES: 5,
      JWT_REFRESH_SECRET: 'JWT_REFRESH_SECRET',
    },
    CORS: {
      ALLOWED_ORIGINS: '',
    },
    DATABASE: {
      MONGODB_URI: '',
    },
    THROTTLER: {
      LIMIT: 10,
      TTL: 1000,
    },
  } satisfies Settings,
}));
