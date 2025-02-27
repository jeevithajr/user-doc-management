import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Change if using Docker
      port: 5432,
      username: 'postgres',
      password: 'yourpassword',
      database: 'yourdatabase',
      entities: [User],
      synchronize: true, // Auto-create tables (Disable in production)
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
