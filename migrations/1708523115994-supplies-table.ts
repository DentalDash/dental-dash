import { MigrationInterface, QueryRunner } from "typeorm";

export class SuppliesTable1708523115994 implements MigrationInterface {
    name = 'SuppliesTable1708523115994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplies" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "supplies" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "supplies" DROP CONSTRAINT "PK_49c0dc272c9fcf2723bdfd48be1"`);
        await queryRunner.query(`ALTER TABLE "supplies" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD CONSTRAINT "PK_49c0dc272c9fcf2723bdfd48be1" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "supplies" DROP CONSTRAINT "PK_49c0dc272c9fcf2723bdfd48be1"`);
        await queryRunner.query(`ALTER TABLE "supplies" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD CONSTRAINT "PK_49c0dc272c9fcf2723bdfd48be1" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplies" DROP CONSTRAINT "PK_49c0dc272c9fcf2723bdfd48be1"`);
        await queryRunner.query(`ALTER TABLE "supplies" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD CONSTRAINT "PK_49c0dc272c9fcf2723bdfd48be1" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "supplies" DROP CONSTRAINT "PK_49c0dc272c9fcf2723bdfd48be1"`);
        await queryRunner.query(`ALTER TABLE "supplies" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD CONSTRAINT "PK_49c0dc272c9fcf2723bdfd48be1" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "supplies" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "supplies" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
