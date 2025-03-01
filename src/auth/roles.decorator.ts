import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../entities/user.entity';

export const Roles = (role: UserRole) => SetMetadata('role', role);
