import { IsNotEmpty } from 'class-validator';
import { Dentist } from 'src/dentist/entities/dentist.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Procedure } from 'src/procedures/entities/procedures.entity';
import { Supplies } from 'src/suplies/entities/supplies.entity';

export class CreateConsultationDto {
  @IsNotEmpty({ message: 'Informe a data e hora da consulta' })
  date_time: Date;

  @IsNotEmpty({ message: 'Informe o dentista' })
  dentistData: Dentist;

  @IsNotEmpty({ message: 'Informe o paciente' })
  @IsNotEmpty({ message: 'Informe o paciente' })
  patientData: Patient;

  @IsNotEmpty({ message: 'Informe o procedimento' })
  procedures: Procedure[];

  @IsNotEmpty({ message: 'Informe o material' })
  suppliesNames: Supplies[];

  @IsNotEmpty({ message: 'Informe as observações' })
  oservations: string;
}
