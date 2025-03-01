import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserRole } from '../users/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const decodedUser = jwt.verify(token, 'your-secret-key') as { id: string; username: string; role: string };

      //  Cast role to UserRole Enum
      request.user = {
        id: decodedUser.id,
        username: decodedUser.username,
        role: decodedUser.role as UserRole, 
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
