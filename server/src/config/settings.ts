import dotenv from 'dotenv';
import { z } from 'zod';

if (process.env.NODE_ENV === 'dev') {
  dotenv.config();
}

export const settingsSchema = z.object({
  API: z.object({
    LISTENING_PORT: z.number(),
    PREFIX: z.string(),
  }),
  AUTH: z.object({
    JWT_ACCESS_EXPIRE_MINUTES: z.number(),
    JWT_ACCESS_SECRET: z.string(),
    JWT_REFRESH_EXPIRE_MINUTES: z.number(),
    JWT_REFRESH_SECRET: z.string(),
  }),
  CORS: z.object({
    ALLOWED_ORIGINS: z.string(),
  }),
  DATABASE: z.object({
    MONGODB_URI: z.string(),
  }),
  THROTTLER: z.object({
    LIMIT: z.number(),
    TTL: z.number(),
  }),
});

export type Settings = z.infer<typeof settingsSchema>;

export const settings = settingsSchema.parse({
  API: {
    LISTENING_PORT: +process.env.LISTENING_PORT!,
    PREFIX: process.env.API_PREFIX!,
  },
  AUTH: {
    JWT_ACCESS_EXPIRE_MINUTES: +process.env.JWT_ACCESS_EXPIRE_MINUTES!,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_REFRESH_EXPIRE_MINUTES: +process.env.JWT_REFRESH_EXPIRE_MINUTES!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  },
  CORS: {
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS!,
  },
  DATABASE: {
    MONGODB_URI: process.env.MONGODB_URI!,
  },
  THROTTLER: {
    LIMIT: +process.env.THROTTLER_LIMIT!,
    TTL: +process.env.THROTTLER_TTL!,
  },
} satisfies Settings);
