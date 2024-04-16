import { UserRole } from '@/modules/users/types/user-role';

export type TokenPayload = {
  sub: string;
  role: UserRole;
};
