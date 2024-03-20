import { MigrationInterface, QueryRunner } from "typeorm";

export class DentistTable1710818859128 implements MigrationInterface {
    name = 'DentistTable1710818859128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."dentists_crostate_enum" AS ENUM('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO')`);
        await queryRunner.query(`CREATE TABLE "dentists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(20) NOT NULL, "category" character varying(20) NOT NULL, "croNumber" character varying(20) NOT NULL, "croState" "public"."dentists_crostate_enum" NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "REL_9e021c6027929058a25a0e5cf2" UNIQUE ("userId"), CONSTRAINT "PK_ae1fbd6ec33d24fc0939c23325d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dentists" ADD CONSTRAINT "FK_9e021c6027929058a25a0e5cf22" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dentists" DROP CONSTRAINT "FK_9e021c6027929058a25a0e5cf22"`);
        await queryRunner.query(`DROP TABLE "dentists"`);
        await queryRunner.query(`DROP TYPE "public"."dentists_crostate_enum"`);
    }

}
