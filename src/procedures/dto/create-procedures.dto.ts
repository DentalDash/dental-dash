import { ArrayNotEmpty, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProcedureDto {
  @IsNotEmpty({
    message: 'Informe o nome do procedimento',
  })
  @MaxLength(200, {
    message: 'O nome do procedimento deve ter menos de 200 caracteres',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe a descrição do procedimento',
  })
  @MaxLength(200, {
    message: 'A descrição do procedimento deve ter menos de 200 caracteres',
  })
  description: string;

  @ArrayNotEmpty({ message: 'Informe pelo menos um insumo a ser utilizado' })
  suppliesNames: string[];
}
