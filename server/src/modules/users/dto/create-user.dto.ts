import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

import { UserRole } from '../types/user-role';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  hashedPassword: string;

  @ApiProperty({ type: String })
  @IsIn([] satisfies UserRole[])
  role: UserRole;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
