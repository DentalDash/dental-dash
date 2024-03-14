import {
    IsEmail,
    MaxLength,
    IsDateString,
    Matches,
    IsOptional,
  } from 'class-validator';
  
  import { Gender } from '../entities/patient.entity';
  
  export class UpdatePatientsDto {
    
    @IsOptional()
    @MaxLength(200, {
      message: 'O nome do paciente deve ter menos de 200 caracteres',
    })
    patientName: string;
  
    @IsOptional()
    @IsEmail({}, { message: 'Informe um email válido' })
    patientEmail: string;
  
    @IsOptional()
    @Matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:[1-9][0-9]?\s?)?(?:(9\d|[2-9])\d{3})-?(\d{4})$/,
      {
        message: 'Informe um telefone válido',
      },
    )
    phone: string;
  
    @IsOptional()
    @MaxLength(11, {
      message: 'O CPF do paciente deve ter no máximo 11 caracteres',
    })
    @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, {
      message: 'Informe um CPF válido do tipo 000.000.000-00',
    })
    cpf: string;
  
    @IsOptional()
    @MaxLength(20, {
      message: 'O RG do paciente deve ter no máximo 20 caracteres',
    })
    rg: string;
  
    @IsOptional()
    genre: Gender;
  
    @IsOptional()
    @IsDateString(
      { strict: true },
      { message: 'Informe uma data de nascimento válida' },
    )
    birthDate: Date;
  
    @IsOptional()
    address: string;
  
    @IsOptional()
    number: string;
  
    @IsOptional()
    @MaxLength(100, {
      message: 'O complemento do endereço do paciente deve ter no máximo 100 caracteres',
    })
    complement: string;
  
    @IsOptional()
    @MaxLength(100, {
      message: 'A cidade do paciente deve ter no máximo 100 caracteres',
    })
    city: string;
  
    @IsOptional()
    @MaxLength(50, {
      message: 'O estado do paciente deve ter no máximo 50 caracteres',
    })
    state: string;
  
    @IsOptional()
    @MaxLength(9, {
      message: 'O CEP do paciente deve ter no máximo 9 caracteres',
    })
    @Matches(/^\d{5}-\d{3}$/, {
      message: 'Informe um CEP válido do tipo 00000-000',
    })
    zipCode: string;
  
    @IsOptional()
    @MaxLength(500, {
      message: 'As alergias do paciente devem ter no máximo 500 caracteres',
    })
    allergies: string;
  
    @IsOptional()
    @MaxLength(500, {
      message: 'As medicações atuais do paciente devem ter no máximo 500 caracteres',
    })
    currentMedications: string;
  
    @IsOptional()
    @MaxLength(500, {
      message: 'As condições médicas do paciente devem ter no máximo 500 caracteres',
    })
    medicalConditions: string;
  }
  