import { Body, Controller, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { DentistService } from "./dentist.service";
import { CreateDentistDto } from "./dto/create-dentist.dto";
import { Dentist } from "./entities/dentist.entity";
import { RolesGuard } from "src/auth/auth.guard";

@Controller('dentist')

export class DentistController {
    constructor(private dentistService: DentistService) {}

    @Post('/createDentist')
    @UseGuards(RolesGuard)
    async createDentist(
        @Body(ValidationPipe) createDentistDto: CreateDentistDto,
    ): Promise<{ dentist: Dentist; message: string }> {
        const dentist = await this.dentistService.createDentist(createDentistDto);
        return { dentist, message: 'Dentista cadastrado com sucesso!' };
    }
}

