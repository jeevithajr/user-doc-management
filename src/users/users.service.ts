import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async createUser(username: string, password: string, role: UserRole): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({ username, password: hashedPassword, role });

    return this.usersRepository.save(newUser);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
