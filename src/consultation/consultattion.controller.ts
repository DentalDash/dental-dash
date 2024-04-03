import { Body, Controller, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { RolesGuard } from "src/auth/auth.guard";
import { ConsultationService } from "./consultation.service";
import { CreateConsultationDto } from "./dto/create.consultation.dto";
import { Consultation } from "./entities/consultation.entity";

@Controller('consultation')

export class ConsultationController {
    constructor(private consultationService: ConsultationService) {}

    @Post('/createConsultation')
    @UseGuards(RolesGuard)
    async createConsultation(
        @Body(ValidationPipe) createConsultationDto: CreateConsultationDto,
    ): Promise<{ consultation: Consultation; message: string }> {
        const consultation = await this.consultationService.createConsultation(createConsultationDto);
        return { consultation, message: 'Consulta cadastrada com sucesso!' };
    }
}