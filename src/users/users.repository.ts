import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserRole } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(username: string, password: string, role: string): Promise<User> {
    const user = new this.userModel({ username, password, role: role as UserRole });
    return user.save();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async updateUserRole(id: string, role: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, { role }, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<any> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec(); 
  }
}
