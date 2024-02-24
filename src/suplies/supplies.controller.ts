import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SuppliesService } from './supplies.service';
import { CreateSuppliesDto } from './dto/create-supplies.dto';
import { Supplies } from './entities/supplies.entity';

@Controller('supplies')
export class SuppliesController {
  constructor(private suppliesService: SuppliesService) {}

  @Post('/createSupplies')
  async createSupplies(
    @Body(ValidationPipe) createSuppliesDto: CreateSuppliesDto,
  ): Promise<{ supplies: Supplies; message: string }> {
    const supplies =
      await this.suppliesService.createSupplies(createSuppliesDto);
    return { supplies, message: 'Insulmo cadastrado com sucesso!' };
  }
}
