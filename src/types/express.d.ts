import { UserRole } from '../users/user.schema';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      username: string;
      role: UserRole;
    };
  }
}
