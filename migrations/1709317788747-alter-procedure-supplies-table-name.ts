import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterProcedureSuppliesTableName1709317788747
  implements MigrationInterface
{
  name = 'AlterProcedureSuppliesTableName1709317788747';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "supplies" DROP CONSTRAINT "FK_f4d6ef229cf9e4c8104908c0df3"`,
    );
    await queryRunner.query(
      `CREATE TABLE "procedure_supplies" ("proceduresId" uuid NOT NULL, "suppliesId" uuid NOT NULL, CONSTRAINT "PK_7e5ba5524b53e0475243a1ec5cb" PRIMARY KEY ("proceduresId", "suppliesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc57e342512c5d8e7a4a19f394" ON "procedure_supplies" ("proceduresId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a74a1fe5f955c1d1944b257b9b" ON "procedure_supplies" ("suppliesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "supplies" DROP COLUMN "proceduresId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "procedure_supplies" ADD CONSTRAINT "FK_dc57e342512c5d8e7a4a19f3944" FOREIGN KEY ("proceduresId") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "procedure_supplies" ADD CONSTRAINT "FK_a74a1fe5f955c1d1944b257b9b7" FOREIGN KEY ("suppliesId") REFERENCES "supplies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "procedure_supplies" DROP CONSTRAINT "FK_a74a1fe5f955c1d1944b257b9b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "procedure_supplies" DROP CONSTRAINT "FK_dc57e342512c5d8e7a4a19f3944"`,
    );
    await queryRunner.query(`ALTER TABLE "supplies" ADD "proceduresId" uuid`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a74a1fe5f955c1d1944b257b9b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dc57e342512c5d8e7a4a19f394"`,
    );
    await queryRunner.query(`DROP TABLE "procedure_supplies"`);
    await queryRunner.query(
      `ALTER TABLE "supplies" ADD CONSTRAINT "FK_f4d6ef229cf9e4c8104908c0df3" FOREIGN KEY ("proceduresId") REFERENCES "procedures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
