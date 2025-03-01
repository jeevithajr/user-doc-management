import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  username: string;
  role: 'admin' | 'editor' | 'viewer';
}
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const decodedUser = jwt.verify(token, 'your-secret-key') as JwtPayload;
      request.user = decodedUser;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
