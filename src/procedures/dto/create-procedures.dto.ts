import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProcedureDro {
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
}
