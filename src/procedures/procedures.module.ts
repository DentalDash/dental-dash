import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProceduresService } from './procedures.service';
import { ProceduresRepository } from './procedures.repository';
import { ProceduresController } from './procedures.controller';
import { Procedure } from './entities/procedures.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  providers: [ProceduresService, ProceduresRepository],
  controllers: [ProceduresController],
})
export class ProcedureModule {}
