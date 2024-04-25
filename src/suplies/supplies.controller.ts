import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Param,
  Delete,
  Get,
  Patch,
  UseGuards,
  ForbiddenException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SuppliesService } from './supplies.service';
import { CreateSuppliesDto } from './dto/create-supplies.dto';
import { Supplies } from './entities/supplies.entity';
import { UserRole } from 'src/users/user.role';
import { Role } from 'src/auth/auth.role';
import { ReturnSuppliesDto } from './dto/return-supplies.dto';
import { RolesGuard } from 'src/auth/auth.guard';
import { UpdateSuppliesDto } from './dto/update-supplies.dto';
import { GetSupplieId } from 'src/auth/auth.supplies';

@Controller('supplies')
export class SuppliesController {
  constructor(private suppliesService: SuppliesService) {}

  @Post('/createSupplies')
  async createSupplies(
    @Body(ValidationPipe) createSuppliesDto: CreateSuppliesDto,
  ): Promise<{ supplies: Supplies; message: string }> {
    const supplies =
      await this.suppliesService.createSupplies(createSuppliesDto);
    return { supplies, message: 'Insumo cadastrado com sucesso!' };
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  async deleteSupplies(@Param('id') id: string) {
    await this.suppliesService.deleteSupplies(id);
    return {
      message: 'Insumo removido com sucesso',
    };
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  async findSuppliesById(@Param('id') id): Promise<ReturnSuppliesDto> {
    const supplies = await this.suppliesService.findSuppliesById(id);
    return {
      supplies,
      message: 'Insumo encontrado',
    };
  }

  @Patch(':id')
  @Role(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async updateSupplies(
    @Body(ValidationPipe) updateSuppliesDto: UpdateSuppliesDto,
    @GetSupplieId() supplies: Supplies,
    @Param('id') id: string,
  ) {
    try {
      const updatedSupple = await this.suppliesService.updateSupplies(
        updateSuppliesDto,
        id,
      );
      return updatedSupple;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Você não tem acesso para os insumos');
      } else {
        console.log(error);

        throw new InternalServerErrorException('Erro ao atualizar o insumo');
      }
    }
  }
}
