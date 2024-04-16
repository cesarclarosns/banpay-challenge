import { TestBed } from '@automock/jest';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const { unit } = TestBed.create(AuthService).compile();
    authService = unit;
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
