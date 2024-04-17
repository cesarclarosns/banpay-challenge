import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

import { UserRole } from '@/modules/users/types/user-role';

export class SignUpDto {
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
  password: string;

  @ApiProperty({ type: String })
  @IsIn([
    'films',
    'locations',
    'people',
    'species',
    'vehicles',
  ] satisfies UserRole[])
  role: UserRole;

  constructor(partial: Partial<SignUpDto>) {
    Object.assign(this, partial);
  }
}
