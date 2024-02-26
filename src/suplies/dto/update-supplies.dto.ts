import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateSuppliesDto {
  @IsNotEmpty({
    message: 'Informe o nome do suprimento',
  })
  @MaxLength(200, {
    message: 'O nome do suprimento deve ter menos de 200 caracteres',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe a descrição do suprimento',
  })
  @MaxLength(200, {
    message: 'A descrição do suprimento deve ter menos de 200 caracteres',
  })
  description: string;

  @IsNotEmpty({
    message: 'Informe se o suprimento é consumível',
  })
  isConsumable: boolean;

  @IsNotEmpty({
    message: 'Informe o tipo de material do suprimento',
  })
  @MaxLength(200, {
    message:
      'O tipo de material do suprimento deve ter menos de 200 caracteres',
  })
  materialType: string;
}
