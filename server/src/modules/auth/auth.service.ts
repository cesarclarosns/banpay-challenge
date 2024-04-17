import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';

import { settings } from '@/config/settings';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { TokensDto } from './dto/tokens.dto';
import { TokenPayload } from './types/token-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<TokensDto> {
    const user = await this.usersService.findOneByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await argon2.verify(
      user.hashedPassword,
      signInDto.password,
    );
    if (!passwordMatches)
      throw new UnauthorizedException('Invalid credentials');

    return await this.createTokens(user);
  }

  async signUp(signUpDto: SignUpDto): Promise<UserDto> {
    const user = await this.usersService.findOneByEmail(signUpDto.email);
    if (user) throw new BadRequestException('Email is already registered');

    const hashedPassword = await this.createPasswordHash(signUpDto.password);

    const newUser = await this.usersService.create(
      new CreateUserDto({
        email: signUpDto.email,
        hashedPassword,
        name: signUpDto.name,
        role: signUpDto.role,
      }),
    );

    return newUser;
  }

  async refreshTokens(userId: string): Promise<TokensDto> {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new UnauthorizedException();

    const tokens = await this.createTokens(user);
    return tokens;
  }

  async createTokens(user: UserDto): Promise<TokensDto> {
    const payload = { role: user.role, sub: user.id } satisfies TokenPayload;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: settings.AUTH.JWT_ACCESS_EXPIRE_MINUTES * 60,
        secret: settings.AUTH.JWT_ACCESS_SECRET,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: settings.AUTH.JWT_REFRESH_EXPIRE_MINUTES * 60,
        secret: settings.AUTH.JWT_REFRESH_SECRET,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async createPasswordHash(password: string): Promise<string> {
    return await argon2.hash(password);
  }
}
