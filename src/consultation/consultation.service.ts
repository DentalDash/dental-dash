import { Injectable, NotFoundException } from "@nestjs/common";
import { ConsultationRepository } from "./consultation.repository";
import { CreateConsultationDto } from "./dto/create.consultation.dto";
import { Consultation } from "./entities/consultation.entity";

@Injectable()

export class ConsultationService{
    constructor(private readonly consultationRepository: ConsultationRepository) {}

    async createConsultation(createConsultationDto: CreateConsultationDto): Promise<Consultation> {
        return this.consultationRepository.createConsultation(createConsultationDto);
    }

    async deleteConsultation(id: string) {
        const result = await this.consultationRepository.delete({ id: id });
        if (result.affected === 0) {
            throw new NotFoundException(
                'Não foi encontrado uma consulta com os dados informados');
        }
    }
}
