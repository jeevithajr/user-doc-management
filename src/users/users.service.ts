import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(username: string, password: string, role: string): Promise<User> {
    return this.userRepository.createUser(username, password, role);
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  updateUserRole(id: string, role: string): Promise<User | null> {
    return this.userRepository.updateUserRole(id, role);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers() 
  }
}
