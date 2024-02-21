import { Module } from '@nestjs/common';
import { Supplies } from './entities/supplies.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliesService } from './supplies.service';
import { SuppliesRepository } from './supplies.repository';
import { SuppliesController } from './supplies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Supplies])],
  providers: [SuppliesService, SuppliesRepository],
  controllers: [SuppliesController],
})
export class SuppliesModule {}
