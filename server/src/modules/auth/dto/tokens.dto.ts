import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty()
  accessToken: string;

  refreshToken: string;

  constructor(partial: Partial<TokensDto>) {
    Object.assign(this, partial);
  }
}
