import '@mocks/config/settings';

import { TestBed } from '@automock/jest';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';

import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { TokensDto } from './dto/tokens.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: jest.Mocked<JwtService>;
  let usersService: jest.Mocked<UsersService>;

  const _user = new UserDto({
    email: 'email@example.com',
    hashedPassword: 'password',
  });
  const _tokens = new TokensDto({ accessToken: '', refreshToken: '' });

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();
    authService = unit;
    jwtService = unitRef.get(JwtService);
    usersService = unitRef.get(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    const signInDto = new SignInDto({
      email: 'email@example.com',
      password: 'password',
    });

    it('should throw UnauthorizedException if user is not found', () => {
      usersService.findOneByEmail.mockResolvedValue(null);

      expect(authService.signIn(signInDto)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', () => {
      usersService.findOneByEmail.mockResolvedValueOnce(_user);

      const spy1 = jest.spyOn(argon2, 'verify');
      spy1.mockResolvedValueOnce(false);

      expect(authService.signIn(signInDto)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });

    it('should return tokens if credentials are valid', () => {
      usersService.findOneByEmail.mockResolvedValueOnce(_user);

      const spy1 = jest.spyOn(argon2, 'verify');
      spy1.mockResolvedValueOnce(true);

      const spy2 = jest.spyOn(authService, 'createTokens');
      spy2.mockResolvedValueOnce(_tokens);

      expect(authService.signIn(signInDto)).resolves.toMatchObject(_tokens);
    });
  });

  describe('signUp', () => {
    const signUpDto = new SignUpDto({ email: 'email@example.com' });

    it('should return a new user', () => {
      usersService.findOneByEmail.mockResolvedValueOnce(null);

      const spy1 = jest.spyOn(authService, 'createPasswordHash');
      spy1.mockResolvedValue('hashedPassword');

      usersService.create.mockResolvedValueOnce(_user);

      expect(authService.signUp(signUpDto)).resolves.toMatchObject(_user);
    });

    it('should throw BadRequestExecption if user is found', () => {
      usersService.findOneByEmail.mockResolvedValueOnce(_user);

      expect(authService.signUp(signUpDto)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });

  describe('refreshTokens', () => {
    it('should return tokens', () => {
      usersService.findOneById.mockResolvedValueOnce(_user);

      const spy1 = jest.spyOn(authService, 'createTokens');
      spy1.mockResolvedValueOnce(_tokens);

      expect(authService.refreshTokens('id')).resolves.toMatchObject(_tokens);
    });

    it('should throw UnauthorizedExecption if user is not found', () => {
      usersService.findOneById.mockResolvedValueOnce(null);

      expect(authService.refreshTokens('id')).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });
  });

  describe('createTokens', () => {
    it('should return tokens', () => {
      jwtService.signAsync.mockResolvedValue('token');

      const spy = jest.spyOn(authService, 'createTokens');
      spy.mockResolvedValueOnce(_tokens);

      expect(authService.createTokens(_user)).resolves.toMatchObject(_tokens);
    });
  });

  describe('createPasswordHash', () => {
    it('should return a password hash', () => {
      const spy = jest.spyOn(argon2, 'hash');
      spy.mockResolvedValueOnce('hash');

      expect(authService.createPasswordHash('password')).resolves.toBe('hash');
    });
  });

  describe('updatePassword', () => {
    it('should update password', () => {
      const spy = jest.spyOn(authService, 'createPasswordHash');
      spy.mockResolvedValueOnce('hash');

      usersService.update.mockResolvedValueOnce(_user);

      expect(
        authService.updatePassword('id', { password: 'password' }),
      ).resolves.toBe(void 0);
    });

    it('should throw NotFoundException if user is not found', () => {
      const spy = jest.spyOn(authService, 'createPasswordHash');
      spy.mockResolvedValueOnce('hash');

      usersService.update.mockResolvedValueOnce(null);

      expect(
        authService.updatePassword('id', { password: 'password' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
