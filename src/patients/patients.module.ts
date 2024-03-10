import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientsRepository } from "./patients.repository";
import { PatientsService } from "./patients.service";
import { PatientsController } from "./patients.controller";

@Module({
    imports: [TypeOrmModule.forFeature([PatientsRepository])],
    providers: [PatientsService, PatientsRepository],
    controllers: [PatientsController],

})
export class PatientsModule {}