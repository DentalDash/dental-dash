import { BadRequestException, Injectable } from '@nestjs/common';
import { Dentist, EstadoCRO } from './entities/dentist.entity';
import { CreateDentistDto } from './dto/create-dentist.dto';
import { Repository } from 'typeorm';

@Injectable()
export class DentistRepository extends Repository<Dentist> {
  async createDentist(createDentistDto: CreateDentistDto): Promise<Dentist> {
    const { name, category, croNumber, croState, isAdmin } = createDentistDto;

    const croAlreadyExists = await this.findOne({ where: { croNumber } });
    if (croAlreadyExists) {
      throw new BadRequestException('CRO já cadastrado');
    }

    if (!Object.values(EstadoCRO).includes(croState)) {
      throw new BadRequestException('Estado do CRO inválido');
    }

    const dentist = new Dentist({
      name,
      category,
      croNumber,
      croState,
      isAdmin,
    });

    return this.save(dentist);
  }
}
