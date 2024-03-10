import { BadRequestException, Injectable } from '@nestjs/common';
import { Patient } from './entities/patient.entity';
import { Repository, EntityManager, DataSource } from 'typeorm';
import { CreatePatientsDto } from './dto/create-patients.dto';

@Injectable()
export class PatientsRepository extends Repository<Patient> {
  constructor(private dataSource: DataSource) {
    super(Patient, dataSource.createEntityManager());
  }
  private entityManager: EntityManager;

  async createPatient(createPatientsDto: CreatePatientsDto): Promise<Patient> {
    const {
      patientName,
      patientEmail,
      phone,
      cpf,
      rg,
      genre,
      birthDate,
      address,
      number,
      complement,
      city,
      state,
      zipCode,
      allergies,
      currentMedications,
      medicalConditions,
    } = createPatientsDto;

    const cpfExists = await this.findOne({ where: { cpf } });
    if (cpfExists) {
      throw new BadRequestException('CPF já cadastrado');
    }

    const patient = new Patient();
    patient.patientName = patientName;
    patient.patientEmail = patientEmail;
    patient.phone = phone;
    patient.cpf = cpf;
    patient.rg = rg;
    patient.genre = genre;
    patient.birthDate = birthDate;
    patient.address = address;
    patient.number = number;
    patient.complement = complement;
    patient.city = city;
    patient.state = state;
    patient.zipCode = zipCode;
    patient.allergies = allergies;
    patient.currentMedications = currentMedications;
    patient.medicalConditions = medicalConditions;

    return this.manager.save(patient);
  }
}
