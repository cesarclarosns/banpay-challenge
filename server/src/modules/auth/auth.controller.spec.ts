import '@mocks/config/settings';

import { TestBed } from '@automock/jest';

import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const { unit } = TestBed.create(AuthController).compile();
    authController = unit;
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signIn', () => {});

  describe('signUp', () => {});

  describe('refresh', () => {});
});
