import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSource, EntityManager, Repository } from "typeorm";
import { Dentist, EstadoCRO } from "./entities/dentist.entity";
import { CreateDentistDto } from "./dto/create-dentist.dto";

@Injectable()
export class DentistRepository extends Repository<Dentist> {
    constructor(private datasource : DataSource) {
        super(Dentist, datasource.createEntityManager());
        this.entityManager = datasource.createEntityManager();
    }

    private entityManager: EntityManager;
    async createDentist(createDentistDto: CreateDentistDto): Promise<Dentist> {
        const {
            name,
            category,
            croNumber,
            croState,
            isAdmin,

        } = createDentistDto;

        const croExist = await this.findOne({ where: { croNumber } });
        if (croExist) {
          throw new BadRequestException('CRO já cadastrado');
        }


        if (!Object.values(EstadoCRO).includes(croState)) {
            throw new BadRequestException('Estado do CRO inválido');
        }

        const dentist = new Dentist(createDentistDto);
        dentist.name = name;
        dentist.category = category;
        dentist.croNumber = croNumber;
        dentist.croState = croState;
        dentist.isAdmin = isAdmin;

        return this.save(dentist);

    }


}