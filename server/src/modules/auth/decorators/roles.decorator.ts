import { Reflector } from '@nestjs/core';

import { UserRole } from '@/modules/users/types/user-role';

export const Roles = Reflector.createDecorator<UserRole[]>();
