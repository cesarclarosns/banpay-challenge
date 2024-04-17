import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

import { UserRole } from '../types/user-role';

export class UpdateUserRoleDto {
  @ApiProperty({ type: String })
  @IsIn([
    'admin',
    'films',
    'locations',
    'people',
    'species',
    'vehicles',
  ] satisfies UserRole[])
  role: UserRole;
}
