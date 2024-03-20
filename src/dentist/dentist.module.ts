import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dentist } from "./entities/dentist.entity";
import { DentistController } from "./dentist.controller";
import { DentistService } from "./dentist.service";
import { DentistRepository } from "./dentist.repository";

@Module({
    imports: [TypeOrmModule.forFeature([DentistRepository])],
    providers: [DentistService, DentistRepository],
    controllers: [DentistController],
    exports: [],
})
export class DentistModule {}