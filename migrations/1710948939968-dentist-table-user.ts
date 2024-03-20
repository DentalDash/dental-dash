import { MigrationInterface, QueryRunner } from "typeorm";

export class DentistTableUser1710948939968 implements MigrationInterface {
    name = 'DentistTableUser1710948939968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dentists" DROP COLUMN "croNumber"`);
        await queryRunner.query(`ALTER TABLE "dentists" ADD "croNumber" character varying(6) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dentists" DROP COLUMN "croNumber"`);
        await queryRunner.query(`ALTER TABLE "dentists" ADD "croNumber" character varying(10) NOT NULL`);
    }

}
