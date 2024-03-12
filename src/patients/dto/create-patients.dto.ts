import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  Matches,
} from 'class-validator';

import { Gender } from '../entities/patient.entity';

export class CreatePatientsDto {
  @IsNotEmpty({ message: 'Informe o nome do paciente' })
  @MaxLength(200, {
    message: 'O nome do paciente deve ter menos de 200 caracteres',
  })
  patientName: string;

  @IsNotEmpty({ message: 'Informe o email do paciente' })
  @IsEmail({}, { message: 'Informe um email válido' })
  patientEmail: string;

  @IsNotEmpty({ message: 'Informe o telefone do paciente' })
  @Matches(
    /^(?:(?:\+|00)?(55)\s?)?(?:[1-9][0-9]?\s?)?(?:(9\d|[2-9])\d{3})-?(\d{4})$/,
    {
      message: 'Informe um telefone válido',
    },
  )
  phone: string;

  @IsNotEmpty({ message: 'Informe o CPF do paciente' })
  @MaxLength(11, {
    message: 'O CPF do paciente deve ter no máximo 11 caracteres',
  })
  @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, {
    //Valida CPF no formato 000.000.000-00 e 00000000000
    message: 'Informe um CPF válido do tipo 000.000.000-00',
  })
  cpf: string;

  @IsNotEmpty({ message: 'Informe o RG do paciente' })
  @MaxLength(20, {
    message: 'O RG do paciente deve ter no máximo 20 caracteres',
  })
  rg: string;

  @IsNotEmpty({ message: 'Informe o gênero do paciente' })
  genre: Gender;

  @IsNotEmpty({ message: 'Informe a data de nascimento do paciente' })
  @IsDateString(
    { strict: true },
    { message: 'Informe uma data de nascimento válida' },
  )
  birthDate: Date;

  @IsNotEmpty({ message: 'Informe o endereço do paciente' })
  address: string;

  @IsNotEmpty({ message: 'Informe o número do endereço do paciente' })
  number: string;

  @IsNotEmpty({ message: 'Informe o complemento do endereço do paciente' })
  @MaxLength(100, {
    message:
      'O complemento do endereço do paciente deve ter no máximo 100 caracteres',
  })
  complement: string;

  @IsNotEmpty({ message: 'Informe a cidade do paciente' })
  @MaxLength(100, {
    message: 'A cidade do paciente deve ter no máximo 100 caracteres',
  })
  city: string;

  @IsNotEmpty({ message: 'Informe o estado do paciente' })
  @MaxLength(50, {
    message: 'O estado do paciente deve ter no máximo 50 caracteres',
  })
  state: string;

  @IsNotEmpty({ message: 'Informe o CEP do paciente' })
  @MaxLength(9, {
    message: 'O CEP do paciente deve ter no máximo 9 caracteres',
  })
  @Matches(/^\d{5}-\d{3}$/, {
    //Valida CEP no formato 00000-000
    message: 'Informe um CEP válido do tipo 00000-000',
  })
  zipCode: string;

  @IsNotEmpty({ message: 'Informe as alergias do paciente' })
  @MaxLength(500, {
    message: 'As alergias do paciente devem ter no máximo 500 caracteres',
  })
  allergies: string;

  @IsNotEmpty({ message: 'Informe as medicações atuais do paciente' })
  @MaxLength(500, {
    message:
      'As medicações atuais do paciente devem ter no máximo 500 caracteres',
  })
  currentMedications: string;

  @IsNotEmpty({ message: 'Informe as condições médicas do paciente' })
  @MaxLength(500, {
    message:
      'As condições médicas do paciente devem ter no máximo 500 caracteres',
  })
  medicalConditions: string;
}
