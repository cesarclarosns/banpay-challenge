import { TestBed } from '@automock/jest';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: jest.Mocked<Model<User>>;

  const _user = new UserDto({ email: 'email@example.com' });
  const _document = {
    toJSON() {
      return _user;
    },
  };
  const _documents = [_document];

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UsersService).compile();
    usersService = unit;
    userModel = unitRef.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should return a new user', () => {
      userModel.create.mockResolvedValueOnce(_document as any);

      expect(usersService.create(new CreateUserDto({}))).resolves.toMatchObject(
        _user,
      );
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      userModel.find.mockResolvedValueOnce(_documents as any);
      const users = await usersService.findAll({ limit: 5, skip: 0 });

      expect(users[0]).toMatchObject(_user);
      expect(users.length).toBe(1);
    });
  });

  describe('findOneById', () => {
    it('should return a user if found', () => {
      userModel.findById.mockResolvedValueOnce(_document as any);

      expect(usersService.findOneById('id')).resolves.toMatchObject(_user);
    });

    it('should return null if not found', () => {
      userModel.findById.mockResolvedValueOnce(null);

      expect(usersService.findOneById('id')).resolves.toBe(null);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user if found', () => {
      userModel.findOne.mockResolvedValueOnce(_document as any);

      expect(usersService.findOneByEmail('email')).resolves.toMatchObject(
        _user,
      );
    });

    it('should return null if not found', () => {
      userModel.findOne.mockResolvedValueOnce(null);

      expect(usersService.findOneById('id')).resolves.toBe(null);
    });
  });

  describe('update', () => {
    it('should return a user if found and updated', () => {
      userModel.findOneAndUpdate.mockResolvedValueOnce(_document as any);

      expect(usersService.update('id', {})).resolves.toMatchObject(_user);
    });

    it('should return null if not found', () => {
      userModel.findOneAndUpdate.mockResolvedValueOnce(null);

      expect(usersService.update('id', {})).resolves.toBe(null);
    });
  });

  describe('remove', () => {
    it('should return a user if found and removed', () => {
      userModel.findOneAndDelete.mockResolvedValueOnce(_document as any);

      expect(usersService.remove('id')).resolves.toMatchObject(_user);
    });

    it('should return null if not found', () => {
      userModel.findOneAndDelete.mockResolvedValueOnce(null);

      expect(usersService.remove('id')).resolves.toBe(null);
    });
  });

  describe('updateRole', () => {
    it('should return a user if found and updated', () => {
      userModel.findOneAndUpdate.mockResolvedValueOnce(_document as any);

      expect(
        usersService.updateRole('id', { role: 'admin' }),
      ).resolves.toMatchObject(_user);
    });

    it('should return null if not found', () => {
      userModel.findOneAndUpdate.mockResolvedValueOnce(null);

      expect(usersService.updateRole('id', { role: 'admin' })).resolves.toBe(
        null,
      );
    });
  });
});
