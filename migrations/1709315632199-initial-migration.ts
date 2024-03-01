import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1709315632199 implements MigrationInterface {
  name = 'InitialMigration1709315632199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(200) NOT NULL, "name" character varying(200) NOT NULL, "role" character varying(20) NOT NULL, "status" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "salt" character varying NOT NULL, "confirmationToken" character varying(64), "recoverToken" character varying(64), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "procedures" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(200) NOT NULL, CONSTRAINT "PK_e7775bab78f27b4c47580b6cb4b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "supplies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(200) NOT NULL, "isConsumable" boolean NOT NULL DEFAULT false, "materialType" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "proceduresId" uuid, CONSTRAINT "PK_49c0dc272c9fcf2723bdfd48be1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "procedures_supplies_supplies" ("proceduresId" uuid NOT NULL, "suppliesId" uuid NOT NULL, CONSTRAINT "PK_f11b67158a5d4adadaaaf8772ce" PRIMARY KEY ("proceduresId", "suppliesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_743daaab4681137e855b9f8d47" ON "procedures_supplies_supplies" ("proceduresId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f7b2edb03e598aa267b2ab315c" ON "procedures_supplies_supplies" ("suppliesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "supplies" ADD CONSTRAINT "FK_f4d6ef229cf9e4c8104908c0df3" FOREIGN KEY ("proceduresId") REFERENCES "procedures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "procedures_supplies_supplies" ADD CONSTRAINT "FK_743daaab4681137e855b9f8d477" FOREIGN KEY ("proceduresId") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "procedures_supplies_supplies" ADD CONSTRAINT "FK_f7b2edb03e598aa267b2ab315c4" FOREIGN KEY ("suppliesId") REFERENCES "supplies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "procedures_supplies_supplies" DROP CONSTRAINT "FK_f7b2edb03e598aa267b2ab315c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "procedures_supplies_supplies" DROP CONSTRAINT "FK_743daaab4681137e855b9f8d477"`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplies" DROP CONSTRAINT "FK_f4d6ef229cf9e4c8104908c0df3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f7b2edb03e598aa267b2ab315c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_743daaab4681137e855b9f8d47"`,
    );
    await queryRunner.query(`DROP TABLE "procedures_supplies_supplies"`);
    await queryRunner.query(`DROP TABLE "supplies"`);
    await queryRunner.query(`DROP TABLE "procedures"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
