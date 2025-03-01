import { Controller, Get, Post, Param, Body, UseGuards, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User} from './user.schema';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './user.entity';

@Controller('users') // Base route: /users
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    //  Get user by username
    @Get('username/:username')
    async getUserByUsername(@Param('username') username: string): Promise<User | null> {
        return this.usersService.findByUsername(username);
    }

     //  Get user by id
     @Get(':id')
     async getUserByid(@Param('id') id: number): Promise<User | null> {
         return this.usersService.findById(id.toString());
     }

    @Get()
    @Roles(UserRole.ADMIN) 
    getAllUsers() {
      return this.usersService.getAllUsers();
    }

    @Put(':id/role')
    @Roles(UserRole.ADMIN) 
    updateUserRole(@Param('id') id: number, @Body() updateRoleDto: { role: UserRole }) {
        return this.usersService.updateUserRole(id.toString(), updateRoleDto.role);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN) 
    deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id.toString());
    }

}
