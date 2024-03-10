import { MigrationInterface, QueryRunner } from "typeorm";

export class PatientsTable1710096110875 implements MigrationInterface {
    name = 'PatientsTable1710096110875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."patients_genre_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TABLE "patients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patientName" character varying(200) NOT NULL, "patientEmail" character varying(200) NOT NULL, "phone" character varying(20) NOT NULL, "cpf" character varying(20) NOT NULL, "rg" character varying(20) NOT NULL, "genre" "public"."patients_genre_enum" NOT NULL, "birthDate" date NOT NULL, "address" character varying(200) NOT NULL, "number" character varying(10), "complement" character varying(200), "city" character varying(200) NOT NULL, "state" character varying(100) NOT NULL, "zipCode" character varying(8) NOT NULL, "allergies" text, "currentMedications" text, "medicalConditions" text, CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "patients"`);
        await queryRunner.query(`DROP TYPE "public"."patients_genre_enum"`);
    }

}
