import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../entities/user.entity';

export type UserDocument = User & Document;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt fields
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.VIEWER })
  role: UserRole;
}

// Create Mongoose Schema
export const UserSchema = SchemaFactory.createForClass(User);
