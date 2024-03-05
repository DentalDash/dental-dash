import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ProceduresService } from './procedures.service';
import { CreateProcedureDto } from './dto/create-procedures.dto';
import { Procedure } from './entities/procedures.entity';
import { UserRole } from 'src/users/user.role';
import { Role } from 'src/auth/auth.role';

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

  @Delete(':id')
  @Role(UserRole.ADMIN)
  async deleteProcedures(@Param('id') id: string) {
    await this.procedureService.deleteProcedures(id);
    return {
      message: 'Procedimento removido com sucesso',
    };
  }
}
