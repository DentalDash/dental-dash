import { BadRequestException, Injectable , NotFoundException} from "@nestjs/common";
import { DataSource, EntityManager, Repository } from "typeorm";
import { Dentist, EstadoCRO } from "./entities/dentist.entity";
import { CreateDentistDto } from "./dto/create-dentist.dto";
import { User } from "src/users/entities/user.entity";
import { UserRepository } from "src/users/users.repository";

@Injectable()
export class DentistRepository extends Repository<Dentist> {
    constructor(
        private datasource: DataSource,
        private userRepository: UserRepository
    ) {
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
            userData,
        } = createDentistDto;

        const user = await this.userRepository.findOne({ where: { email: userData.email } });
        
        if (!user) {
            throw new NotFoundException(
                `Email ${userData.email} não encontrado, verifique no cadastro e tente novamente!`,
            );
        }

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
        dentist.user = user;

        return this.save(dentist);
     

    }


}