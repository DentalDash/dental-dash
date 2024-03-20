import { Injectable } from "@nestjs/common";
import { DentistRepository } from "./dentist.repository";
import { Dentist } from "./entities/dentist.entity";
import { CreateDentistDto } from "./dto/create-dentist.dto";
@Injectable()
export class DentistService {
    constructor (private readonly dentistRepository: DentistRepository) {}

    async createDentist(createDentistDto: CreateDentistDto): Promise<Dentist> { 
        return this.dentistRepository.createDentist(createDentistDto);
    }
}
