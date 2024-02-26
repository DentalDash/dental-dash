import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SuppliesRepository } from './supplies.repository';
import { CreateSuppliesDto } from './dto/create-supplies.dto';
import { Supplies } from './entities/supplies.entity';
import { UpdateSuppliesDto } from './dto/update-supplies.dto';

@Injectable()
export class SuppliesService {
  constructor(private readonly suppliesRepository: SuppliesRepository) {}

  async createSupplies(
    createSuppliesDto: CreateSuppliesDto,
  ): Promise<Supplies> {
    return this.suppliesRepository.createSupplies(createSuppliesDto);
  }

  async deleteSupplies(suppliesId: string) {
    const result = await this.suppliesRepository.delete({ id: suppliesId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }

  async findSuppliesById(suppliesId: string): Promise<Supplies> {
    const supplie = await this.suppliesRepository.findOne({
      where: { id: suppliesId },
    });

    if (!supplie) throw new NotFoundException('Insumo não encontrado');

    return supplie;
  }

  async updateSupplies(
    updateSuppliesDto: UpdateSuppliesDto,
    id: string,
  ): Promise<Supplies> {
    const suppilesToUpdate = await this.findSuppliesById(id);
    const { name, description, isConsumable, materialType } = updateSuppliesDto;

    if (name) {
      suppilesToUpdate.name = name;
    }
    if (description) {
      suppilesToUpdate.description = description;
    }
    if (isConsumable) {
      suppilesToUpdate.isConsumable = isConsumable;

      if (materialType) {
        suppilesToUpdate.materialType = materialType;
      }

      try {
        await suppilesToUpdate.save();
        return suppilesToUpdate;
      } catch (error) {
        throw new InternalServerErrorException(
          'Erro ao salvar os dados no banco de dados',
        );
      }
    }
  }
}
