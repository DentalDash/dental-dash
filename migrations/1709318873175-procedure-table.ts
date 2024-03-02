import { MigrationInterface, QueryRunner } from "typeorm";

export class ProcedureTable1709318873175 implements MigrationInterface {
    name = 'ProcedureTable1709318873175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(200) NOT NULL, "name" character varying(200) NOT NULL, "role" character varying(20) NOT NULL, "status" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "salt" character varying NOT NULL, "confirmationToken" character varying(64), "recoverToken" character varying(64), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supplies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(200) NOT NULL, "isConsumable" boolean NOT NULL DEFAULT false, "materialType" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_49c0dc272c9fcf2723bdfd48be1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "procedures" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(200) NOT NULL, CONSTRAINT "PK_e7775bab78f27b4c47580b6cb4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "procedure_supplies" ("proceduresId" uuid NOT NULL, "suppliesId" uuid NOT NULL, CONSTRAINT "PK_7e5ba5524b53e0475243a1ec5cb" PRIMARY KEY ("proceduresId", "suppliesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dc57e342512c5d8e7a4a19f394" ON "procedure_supplies" ("proceduresId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a74a1fe5f955c1d1944b257b9b" ON "procedure_supplies" ("suppliesId") `);
        await queryRunner.query(`ALTER TABLE "procedure_supplies" ADD CONSTRAINT "FK_dc57e342512c5d8e7a4a19f3944" FOREIGN KEY ("proceduresId") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "procedure_supplies" ADD CONSTRAINT "FK_a74a1fe5f955c1d1944b257b9b7" FOREIGN KEY ("suppliesId") REFERENCES "supplies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "procedure_supplies" DROP CONSTRAINT "FK_a74a1fe5f955c1d1944b257b9b7"`);
        await queryRunner.query(`ALTER TABLE "procedure_supplies" DROP CONSTRAINT "FK_dc57e342512c5d8e7a4a19f3944"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a74a1fe5f955c1d1944b257b9b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc57e342512c5d8e7a4a19f394"`);
        await queryRunner.query(`DROP TABLE "procedure_supplies"`);
        await queryRunner.query(`DROP TABLE "procedures"`);
        await queryRunner.query(`DROP TABLE "supplies"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
