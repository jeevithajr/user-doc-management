import { Module } from '@nestjs/common';
import { UsersModule } from '../modules/users.module';
import { AuthModule } from './auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsModule } from './documents.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/user-doc'),
    UsersModule,
    AuthModule,
    DocumentsModule
  ],
})
export class AppModule {}
