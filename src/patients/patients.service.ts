import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PatientsRepository } from './patients.repository';
import { CreatePatientsDto } from './dto/create-patients.dto';
import { Patient } from './entities/patient.entity';
import { UpdatePatientsDto } from './dto/update-patients.dto';
@Injectable()
export class PatientsService {
  constructor(private readonly patientsRepository: PatientsRepository) {}

  async createPatient(createPatientsDto: CreatePatientsDto): Promise<Patient> {
    return this.patientsRepository.createPatient(createPatientsDto);
  }

  async deletePatient(patientId: string) {
    const result = await this.patientsRepository.delete({ id: patientId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }

  async findPatientById(patientId: string): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({
      where: { id: patientId },
    });

    if (!patient) throw new NotFoundException('Paciente não encontrado');

    return patient;
  }

  async updatePatient(
    updatePatientsDto: UpdatePatientsDto,
    id: string,
  ): Promise<Patient> {
    const patientToUpdate = await this.findPatientById(id);
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
    } = updatePatientsDto;

    if (!this.validateCPF(cpf)) {
      throw new BadRequestException('CPF inválido');
    }

    if (patientName) {
      patientToUpdate.patientName = patientName;
    }
    if (patientEmail) {
      patientToUpdate.patientEmail = patientEmail;
    }
    if (phone) {
      patientToUpdate.phone = phone;
    }
    if (cpf) {
      patientToUpdate.cpf = cpf;
    }
    if (rg) {
      patientToUpdate.rg = rg;
    }
    if (genre) {
      patientToUpdate.genre = genre;
    }
    if (birthDate) {
      patientToUpdate.birthDate = birthDate;
    }
    if (address) {
      patientToUpdate.address = address;
    }
    if (number) {
      patientToUpdate.number = number;
    }
    if (complement) {
      patientToUpdate.complement = complement;
    }
    if (city) {
      patientToUpdate.city = city;
    }
    if (state) {
      patientToUpdate.state = state;
    }
    if (zipCode) {
      patientToUpdate.zipCode = zipCode;
    }
    if (allergies) {
      patientToUpdate.allergies = allergies;
    }
    if (currentMedications) {
      patientToUpdate.currentMedications = currentMedications;
    }
    if (medicalConditions) {
      patientToUpdate.medicalConditions = medicalConditions;
    }

    try {
      await this.patientsRepository.save(patientToUpdate);
      return patientToUpdate;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar o paciente');
    }
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
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }
}
