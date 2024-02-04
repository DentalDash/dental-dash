import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pguser',
      password: 'pgpassword',
      database: 'dental_dash',
      entities: [User],
      synchronize: true,
      

    }),
    UsersModule,
    AuthModule,
    
   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
