import { Injectable } from '@nestjs/common';
import { SuppliesRepository } from './supplies.repository';
import { CreateSuppliesDto } from './dto/create-supplies.dto';
import { Supplies } from './entities/supplies.entity';

@Injectable()
export class SuppliesService {
  constructor(private readonly suppliesRepository: SuppliesRepository) {}

  async createSupplies(
    createSuppliesDto: CreateSuppliesDto,
  ): Promise<Supplies> {
    return this.suppliesRepository.createSupplies(createSuppliesDto);
  }
}
