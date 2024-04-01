import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, EntityManager, Repository } from "typeorm";
import { Consultation } from "./entities/consultation.entity";
import { CreateConsultationDto } from "./dto/create.consultation.dto";


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

            const Supplies = await Promise.all(
            suppliesNames.map(async (supplyName) => {
                    const supply = await this.entityManager.findOne(Supplies, {
                        where: { name: supplyName },
                    });
                    if (!supply) {
                        throw new NotFoundException(`Insumo ${supplyName} não encontrado, verifique no cadastro e tente novamente!`);
                    }
                    return supply;
                }));

            const Procedure = await Promise.all(
            procedure.map(async (procedureName) => {
                const procedure = await this.entityManager.findOne(Procedure, {
                    where: { name: procedureName },
                });
                if (!procedure) {
                    throw new NotFoundException(`Procedimento ${procedureName} não encontrado, verifique no cadastro e tente novamente!`);
                }
                return procedure;
            }
        ));
            
            const Patient = await Promise.all(
            [patientData].map(async (cpf) => { 
                const patient = await this.entityManager.findOne(Patient, {
                    where: { cpf: cpf },
                });
                if (!patient) {
                    throw new NotFoundException(`Paciente ${cpf} não encontrado, verifique no cadastro e tente novamente!`);
                }
                return patient;
            })
        );
            const Dentist = await Promise.all(
            [dentistData].map(async (croNumber) => {
                const dentist = await this.entityManager.findOne(Dentist, {
                    where: { cro: croNumber },
                });
                if (!dentist) {
                    throw new NotFoundException(`Dentista ${croNumber} não encontrado, verifique no cadastro e tente novamente!`);
                }
                return dentist;
            }));

        const consultation = new Consultation();
        consultation.date_time = date_time;
        consultation.dentist = dentistData;
        consultation.patient = patientData;
        consultation.procedure = procedure;
        consultation.supplies = suppliesNames;
        consultation.oservations = oservations;

        return this.save(consultation);

    }
}