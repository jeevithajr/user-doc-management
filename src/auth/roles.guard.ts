import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserRole } from '../users/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<UserRole>('role', context.getHandler());
    if (!requiredRole) return true; // Allow if no role is specified.

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.body;
    if (!user || user.role !== requiredRole) {
      throw new ForbiddenException('Access Denied: Admins Only');
    }

    return true;
  }
}
