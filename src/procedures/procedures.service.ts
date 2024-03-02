import { Injectable } from '@nestjs/common';
import { CreateProcedureDto } from './dto/create-procedures.dto';
import { Procedure } from './entities/procedures.entity';
import { ProceduresRepository } from './procedures.repository';

@Injectable()
export class ProceduresService {
  constructor(private readonly proceduresRepository: ProceduresRepository) {}
  async createProcedure(
    createProcedureDto: CreateProcedureDto,
  ): Promise<Procedure> {
    return this.proceduresRepository.createProcedure(createProcedureDto);
  }
}
