import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // Allow other modules (like AuthModule) to use UsersService
})
export class UsersModule {}
