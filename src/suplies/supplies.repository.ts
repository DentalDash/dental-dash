import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Supplies } from './entities/supplies.entity';
import { CreateSuppliesDto } from './dto/create-supplies.dto';

@Injectable()
export class SuppliesRepository extends Repository<Supplies> {
  constructor(private dataSource: DataSource) {
    super(Supplies, dataSource.createEntityManager());
  }
  async createSupplies(
    createSuppliesDto: CreateSuppliesDto,
  ): Promise<Supplies> {
    const existingSupplies = await this.findOne({
      where: {
        name: createSuppliesDto.name.toLowerCase().normalize('NFD'),
      },
    });

    if (existingSupplies) {
      throw new NotFoundException(`O insumo já está cadastrado!`);
    }

    const supplies = new Supplies({
      name: createSuppliesDto.name.toLowerCase().normalize('NFD'),
      description: createSuppliesDto.description,
      isConsumable: createSuppliesDto.isConsumable,
      materialType: createSuppliesDto.materialType,
    });

    return this.save(supplies);
  }
}
