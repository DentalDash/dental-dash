import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientsDto } from './dto/create-patients.dto';
import { Patient } from './entities/patient.entity';

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
}
