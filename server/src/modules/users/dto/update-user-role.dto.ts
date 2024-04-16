import { IsIn } from 'class-validator';

import { UserRole } from '../types/user-role';

export class UpdateUserRoleDto {
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
