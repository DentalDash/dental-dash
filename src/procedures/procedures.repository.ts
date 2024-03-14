import { Injectable, NotFoundException } from '@nestjs/common';
import { Procedure } from './entities/procedures.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProcedureDto } from './dto/create-procedures.dto';
import { Supplies } from 'src/suplies/entities/supplies.entity';

@Injectable()
export class ProceduresRepository extends Repository<Procedure> {
  constructor(private dataSource: DataSource) {
    super(Procedure, dataSource.createEntityManager());
  }

  async createProcedure(
    CreateProcedureDto: CreateProcedureDto,
  ): Promise<Procedure> {
    const { name, description, suppliesNames } = CreateProcedureDto;
     const supplies = await Promise.all(
      suppliesNames.map(async (supplyName) => {
        const supply = await this.manager.findOne(Supplies, {
          where: { name: supplyName },
         });
       if (!supply) {
          throw new NotFoundException(
           `Insumo ${supplyName} não encontrado, verifique no cadastro e tente novamente!`,
          );
        }
      return supply;
     }),
     );

    const procedure = new Procedure();
    procedure.name = name;
    procedure.description = description;
    procedure.supplies = supplies;

    return this.manager.save(procedure);
  }
}
