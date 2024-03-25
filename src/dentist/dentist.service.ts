import { Injectable, NotFoundException } from "@nestjs/common";
import { DentistRepository } from "./dentist.repository";
import { Dentist } from "./entities/dentist.entity";
import { CreateDentistDto } from "./dto/create-dentist.dto";
import { UpdateDentistDto } from "./dto/update-dentist.dto";
@Injectable()
export class DentistService {
    constructor (private readonly dentistRepository: DentistRepository) {}

    async createDentist(createDentistDto: CreateDentistDto): Promise<Dentist> { 
        return this.dentistRepository.createDentist(createDentistDto);
    }

    async deleteDentist(croNumber: string) {
        const result = await this.dentistRepository.delete({ croNumber : croNumber });
        if (result.affected === 0) {
            throw new NotFoundException(
                'Não foi encontrado um dentista com o CRO informado');
        }
    }

    async findDenstistById(id: string): Promise<Dentist> {
        const dentist = await this.dentistRepository.findOne({ where: { id : id} });
    
        if (!dentist) 
            throw new NotFoundException('Dentista não encontrado');
        return dentist;
    }
    
    async updateDentist(
        updateDentistDto: UpdateDentistDto,
        id: string,
    ): Promise<Dentist> {
        const dentistToUpdate = await this.findDenstistById(id);
        const { name, category, croState, croNumber, isAdmin } = updateDentistDto;
    
        if (name) {
            dentistToUpdate.name = name;
        }
        if (category) {
            dentistToUpdate.category = category;
        }
        if (croState) {
            dentistToUpdate.croState = croState;
        }
        if (croNumber) {
            dentistToUpdate.croNumber = croNumber;
        }
        if (isAdmin !== undefined) {
            dentistToUpdate.isAdmin = isAdmin;
        }
    
        try {
            return await dentistToUpdate.save();
        } catch (error) {
            throw new NotFoundException('Dentista não encontrado');
        }
    }

}
