import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ProceduresService } from './procedures.service';
import { CreateProcedureDto } from './dto/create-procedures.dto';
import { Procedure } from './entities/procedures.entity';

@Controller('procedure')
export class ProceduresController {
  constructor(private procedureService: ProceduresService) {}

  @Post('/createProcedure')
  async createSupplies(
    @Body(ValidationPipe) createProceduresDto: CreateProcedureDto,
  ): Promise<{ procedure: Procedure; message: string }> {
    const procedure =
      await this.procedureService.createProcedure(createProceduresDto);
    return { procedure, message: 'Procedimento cadastrado com sucesso!' };
  }
}
