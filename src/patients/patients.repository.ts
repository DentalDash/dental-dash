import { BadRequestException, Injectable } from '@nestjs/common';
import { Patient } from './entities/patient.entity';
import { Repository, EntityManager, DataSource } from 'typeorm';
import { CreatePatientsDto } from './dto/create-patients.dto';

@Injectable()
export class PatientsRepository extends Repository<Patient> {
  constructor(private dataSource: DataSource) {
    super(Patient, dataSource.createEntityManager());
    this.entityManager = dataSource.createEntityManager();
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

    // Verifica se o CPF já está cadastrado
    const cpfExists = await this.findOne({ where: { cpf } });
    if (cpfExists) {
      throw new BadRequestException('CPF já cadastrado');
    }

    
    if (!this.validateCPF(cpf)) {
      throw new BadRequestException('CPF inválido');
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

  
  private validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, ''); 
    if (cpf.length !== 11) return false; 

 
    let sum = 0;
    let remainder: number;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }
}
