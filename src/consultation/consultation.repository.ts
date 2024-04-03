import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, EntityManager, Repository } from "typeorm";
import { Consultation } from "./entities/consultation.entity";
import { CreateConsultationDto } from "./dto/create.consultation.dto";
import { Supplies } from "src/suplies/entities/supplies.entity";
import { Procedure } from "src/procedures/entities/procedures.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Dentist } from "src/dentist/entities/dentist.entity";


@Injectable()
export class ConsultationRepository extends Repository<Consultation> {
    constructor(private datasource : DataSource) {
        super(Consultation, datasource.createEntityManager());
        this.entityManager = datasource.createEntityManager();
    }
    private entityManager: EntityManager;
    
    async createConsultation(createConsultationDto: CreateConsultationDto): Promise<Consultation> {
        const {
            date_time,
            dentistData,
            patientData,
            procedure,
            suppliesNames,
            oservations
        } = createConsultationDto;
    
        const supplies = await Promise.all(
            suppliesNames.map(async (supplyName) => {
                const supply = await this.entityManager.findOne(Supplies, {
                    where: { name: supplyName.name }, 
                });
                if (!supply) {
                    throw new NotFoundException(`Insumo ${supplyName.name} não encontrado, verifique no cadastro e tente novamente!`);
                }
                return supply;
            })
        );
    
        const procedures = await Promise.all(
            procedure.map(async (procedureName) => {
                const procedure = await this.entityManager.findOne(Procedure, {
                    where: { name: procedureName.name },
                });
                if (!procedure) {
                    throw new NotFoundException(`Procedimento ${procedureName.name} não encontrado, verifique no cadastro e tente novamente!`);
                }
                return procedure;
            })
        );
    
        const patients = await Promise.all(
            [patientData.cpf].map(async (cpf) => { 
                const patient = await this.entityManager.findOne(Patient, {
                    where: { cpf: cpf },
                });
                if (!patient) {
                    throw new NotFoundException(`Paciente não encontrado, verifique no cadastro e tente novamente!`);
                }
                return patient;
            })
        );
    
        const dentists = await Promise.all(
            [dentistData.croNumber].map(async (croNumber) => {
                const dentist = await this.entityManager.findOne(Dentist, {
                    where: { croNumber: croNumber },
                });
                if (!dentist) {
                    throw new NotFoundException(`Dentista ${croNumber} não encontrado, verifique no cadastro e tente novamente!`);
                }
                return dentist;
            })
        );

        const consultation = new Consultation();
        consultation.date_time = date_time;
        consultation.dentist = dentists[0]; 
        consultation.patient = patients[0]; 
        consultation.procedure = procedures;
        consultation.supplies = supplies;
        consultation.oservations = oservations;
    
        return this.save(consultation);
    }
}    