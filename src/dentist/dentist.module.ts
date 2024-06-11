import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DentistController } from './dentist.controller';
import { DentistService } from './dentist.service';
import { DentistRepository } from './dentist.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([DentistRepository]), UsersModule]
  ,
  providers: [DentistService, DentistRepository],
  controllers: [DentistController],
  exports: [],
})
export class DentistModule {}
