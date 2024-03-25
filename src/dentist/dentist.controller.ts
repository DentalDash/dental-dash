import { BadRequestException, Body, Controller, Delete, Param, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { DentistService } from "./dentist.service";
import { CreateDentistDto } from "./dto/create-dentist.dto";
import { Dentist } from "./entities/dentist.entity";
import { RolesGuard } from "src/auth/auth.guard";
import { UpdateDentistDto } from "./dto/update-dentist.dto";
import { Role } from "src/auth/auth.role";
import { UserRole } from "src/users/user.role";
import { GetDentistId } from "src/auth/auth.dentis";

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

    @Delete(':croNumber')
    @UseGuards(RolesGuard)
    async deleteDentist(@Param('croNumber') croNumber: string) {
        await this.dentistService.deleteDentist(croNumber);
        return {
            message: 'Dentista removido com sucesso',
        };
    }
    @Patch(':id')
    @Role(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async updateDentist(
        @Body() updateDentistDto: UpdateDentistDto,
        @GetDentistId() dentist : Dentist,
        @Param('id') id: string,

    ) {
        try {
            const updatedDentist = await this.dentistService.updateDentist(updateDentistDto, id);
            return { message: 'Dados atualizados com sucesso!', data: updatedDentist };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }else{
                console.log(error)
                throw new BadRequestException('Erro ao atualizar os dados do dentista, verifique os dados e tente novamente');
            }
        }
    }
}

