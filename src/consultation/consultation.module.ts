import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Type } from "class-transformer";
import { ConsultationRepository } from "./consultation.repository";
import { ConsultationService } from "./consultation.service";
import { ConsultationController } from "./consultattion.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ConsultationRepository])],
    providers: [ConsultationService, ConsultationRepository],
    controllers: [ConsultationController],
    exports: [],
})

export class ConsultationModule {}