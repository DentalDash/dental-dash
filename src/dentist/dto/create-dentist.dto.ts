import { IsBoolean, IsNotEmpty, Length, Matches } from 'class-validator';
import { EstadoCRO } from '../entities/dentist.entity';

export class CreateDentistDto {
  @IsNotEmpty({ message: 'O campo nome não pode estar vazio' })
  name: string;

  @IsNotEmpty({ message: 'O campo categoria não pode estar vazio' })
  category: string;

  @IsNotEmpty({ message: 'O campo número CRO não pode estar vazio' })
  @Length(5, 6, { message: 'O número CRO deve conter 5 ou 6 dígitos' })
  @Matches(/^[A-Z]{2}\d{4,6}$/, {
    message: 'O número CRO deve conter 5 ou 6 dígitos',
  })
  croNumber: string;
  @Length(2, 2, { message: 'O estado CRO deve conter 2 dígitos' })
  @IsNotEmpty({ message: 'O campo estado CRO não pode estar vazio' })
  croState: EstadoCRO;

  @IsBoolean({ message: 'O campo isAdmin deve ser um booleano' })
  isAdmin: boolean;
}
