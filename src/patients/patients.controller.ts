import { BadRequestException, Body, Controller, Delete, ForbiddenException, InternalServerErrorException, Param, Patch, Post, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientsDto } from './dto/create-patients.dto';
import { Patient } from './entities/patient.entity';
import { Role} from 'src/auth/auth.role';
import { UserRole } from 'src/users/user.role';
import { UpdatePatientsDto } from './dto/update-patients.dto';
import { GetPatientId } from 'src/auth/auth.patients';
import { RolesGuard } from 'src/auth/auth.guard';


@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Post('/createPatient')
  async createPatient(
    @Body(ValidationPipe) createPatientsDto: CreatePatientsDto,
  ): Promise<{ patient: Patient; message: string }> {
    const patient = await this.patientsService.createPatient(createPatientsDto);
    return { patient, message: 'Paciente cadastrado com sucesso!' };
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  async deletePatient(@Param('id') id: string) {
    await this.patientsService.deletePatient(id);
    return {
      message: 'Paciente removido com sucesso',
    };
  }

 
  @Patch(':id')
  @Role(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async updatePatient(
    @Body() updatePatientsDto: UpdatePatientsDto,
    @GetPatientId() patient: Patient,
    @Param('id') id: string,
  ) {
    try {
      const updatedPatient = await this.patientsService.updatePatient(updatePatientsDto, id);
      return updatedPatient;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; 
      } else {
        console.error(error); 
        throw new BadRequestException('Erro ao atualizar o paciente');
      }
    }
  }
}