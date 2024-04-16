import { TestBed } from '@automock/jest';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const { unit } = TestBed.create(UsersService).compile();
    usersService = unit;
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });
});
