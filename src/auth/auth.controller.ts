import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('register') 
  async registerUser(
    @Body() body: { username: string; password: string; role: UserRole }
  ) {
    return this.usersService.createUser(body.username, body.password, body.role);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    return this.authService.login(user);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}
