import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { User, UserSchema } from '../schemas/user.schema';
import { UserRepository } from '../repositories/users.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository], 
})
export class UsersModule {}
