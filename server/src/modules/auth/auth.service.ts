import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
import { UpdatePasswordDto } from './dto/update-password.dto';
import { TokenPayload } from './types/token-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(signInDto: SignInDto) {
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

  async signUp(signUpDto: SignUpDto) {
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

  async refreshTokens(userId: string) {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new UnauthorizedException();

    const tokens = await this.createTokens(user);
    return tokens;
  }

  async createTokens(
    user: UserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { role: user.role, sub: user.id } satisfies TokenPayload;

    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken(payload),
      this.createRefreshToken(payload),
    ]);

    return { accessToken, refreshToken };
  }

  async createAccessToken(payload: TokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: settings.AUTH.JWT_ACCESS_EXPIRE_MINUTES * 60,
      secret: settings.AUTH.JWT_ACCESS_SECRET,
    });
  }

  async createRefreshToken(payload: TokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: settings.AUTH.JWT_REFRESH_EXPIRE_MINUTES * 60,
      secret: settings.AUTH.JWT_REFRESH_SECRET,
    });
  }

  async createPasswordHash(password: string) {
    return await argon2.hash(password);
  }

  async updatePassword(userId: string, { password }: UpdatePasswordDto) {
    const hashedPassword = await this.createPasswordHash(password);
    const user = await this.usersService.update(userId, { hashedPassword });
    if (!user) throw new NotFoundException();
  }
}
