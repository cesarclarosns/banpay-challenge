import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { AUTH_COOKIES } from './constants/auth-cookies';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { TokensDto } from './dto/tokens.dto';
import { RefreshTokenGuard } from './guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    headers: {
      'Set-Cookie': {
        description:
          'Set cookie "refreshToken" (httpOnly). This cookie will be used to retrieve an accessToken and rotate the refreshToken.',
      },
    },
    type: TokensDto,
  })
  @ApiBadRequestResponse()
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: SignInDto,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.signIn(signInDto);

    res.cookie(AUTH_COOKIES.refreshToken, refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });

    return { accessToken };
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({ type: SignUpDto })
  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse()
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiCookieAuth(AUTH_COOKIES.refreshToken)
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiOkResponse({
    headers: {
      'Set-Cookie': {
        description:
          'Set cookie "refreshToken" (httpOnly). This cookie will be used to retrieve an accessToken and rotate the refreshToken.',
      },
    },
    type: TokensDto,
  })
  @ApiUnauthorizedResponse()
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user.sub;

    const { accessToken, refreshToken } =
      await this.authService.refreshTokens(userId);

    res.cookie(AUTH_COOKIES.refreshToken, refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });

    return { accessToken };
  }
}
