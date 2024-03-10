import { Injectable } from '@nestjs/common';
import { PatientsRepository } from './patients.repository';
import { CreatePatientsDto } from './dto/create-patients.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(private readonly patientsRepository: PatientsRepository) {}

  async createPatient(createPatientsDto: CreatePatientsDto): Promise<Patient> {
    return this.patientsRepository.createPatient(createPatientsDto);
  }
}
