import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { UserRole } from '../types/user-role';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  hashedPassword: string;

  @ApiProperty({ type: String })
  role: UserRole;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
