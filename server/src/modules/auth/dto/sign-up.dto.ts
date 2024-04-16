import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

import { UserRole } from '@/modules/users/types/user-role';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn([
    'films',
    'locations',
    'people',
    'species',
    'vehicles',
  ] satisfies UserRole[])
  role: UserRole;
}
