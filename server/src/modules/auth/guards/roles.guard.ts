import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { UserRole } from '@/modules/users/types/user-role';

import { Roles } from '../decorators/roles.decorator';

export function matchRoles(roles: UserRole[], userRole: UserRole) {
  for (const role of roles) {
    if (role === userRole) return true;
  }
  return false;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;

    const req = context.switchToHttp().getRequest() as Request;
    const user = req.user;
    return matchRoles(roles, user.role);
  }
}
