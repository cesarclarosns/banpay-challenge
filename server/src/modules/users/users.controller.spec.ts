import { TestBed } from '@automock/jest';

import { UsersController } from './users.controller';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const { unit } = TestBed.create(UsersController).compile();
    usersController = unit;
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
});
