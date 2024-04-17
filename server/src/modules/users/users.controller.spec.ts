import { TestBed } from '@automock/jest';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Request } from 'express';

import { UserDto } from './dto/user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: jest.Mocked<UsersService>;

  const _user = new UserDto({ email: 'email@example.com' });
  const _users = [_user];

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UsersController).compile();
    usersController = unit;
    usersService = unitRef.get(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      usersService.findAll.mockResolvedValueOnce(_users);
      const users = await usersController.findAll({ limit: 5, skip: 0 });

      expect(users[0]).toMatchObject(_user);
      expect(users.length).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', () => {
      usersService.findOneById.mockResolvedValueOnce(_user);

      expect(usersController.findOne('id')).resolves.toMatchObject(_user);
    });

    it('should throw a NotFoundException if not found', () => {
      usersService.findOneById.mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      expect(usersController.findOne('id')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should return a user if found and updated', () => {
      usersService.update.mockResolvedValueOnce(_user);

      expect(
        usersController.update(
          { user: { role: 'admin', sub: 'id' } } as Request,
          'id',
          {},
        ),
      ).resolves.toMatchObject(_user);
    });

    it('should throw a ForbiddenException if id is not equal to the user id in the request', () => {
      expect(
        usersController.update(
          { user: { role: 'admin', sub: 'id1' } } as Request,
          'id2',
          {},
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('should throw a NotFoundException if not found', () => {
      usersService.update.mockResolvedValueOnce(null);

      expect(
        usersController.update(
          { user: { role: 'admin', sub: 'id' } } as Request,
          'id',
          {},
        ),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should return a user if found and removed', () => {
      usersService.remove.mockResolvedValueOnce(_user);

      expect(usersController.remove('id')).resolves.toMatchObject(_user);
    });

    it('should throw a NotFoundException if not found', () => {
      usersService.remove.mockResolvedValue(null);

      expect(usersController.remove('id')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('updateRole', () => {
    it('should return a user if found and updated', () => {
      usersService.updateRole.mockResolvedValueOnce(_user);

      expect(
        usersController.updateRole('id', { role: 'admin' }),
      ).resolves.toMatchObject(_user);
    });

    it('should throw a NotFoundException if not found', () => {
      usersService.updateRole.mockResolvedValueOnce(null);

      expect(
        usersController.updateRole('id', { role: 'admin' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
