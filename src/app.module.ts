import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/logs-config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/log-interceptors';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pguser',
      password: 'pgpassword',
      database: 'dental_dash',
      entities: [User],
      synchronize: true,
    }),
    WinstonModule.forRoot(winstonConfig),
    UsersModule,
    AuthModule,
  ],

  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },],

  }
    )
export class AppModule {}
