import { MigrationInterface, QueryRunner } from "typeorm";

export class Init21710062494115 implements MigrationInterface {
    name = 'Init21710062494115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmacy" DROP COLUMN "pharmacy_lat"`);
        await queryRunner.query(`ALTER TABLE "pharmacy" ADD "pharmacy_lat" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pharmacy" DROP COLUMN "pharmacy_lng"`);
        await queryRunner.query(`ALTER TABLE "pharmacy" ADD "pharmacy_lng" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "UQ_70b7d340b9a5de76490930929de"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "UQ_eb6e17e3d987697c145d0f2064f"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "UQ_aea4c0c88efb647de9ea091e7bd"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "store_lat"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "store_lat" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "UQ_51e413c0b0bad5cbac5d497bcab"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "store_lng"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "store_lng" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "store_lng"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "store_lng" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "UQ_51e413c0b0bad5cbac5d497bcab" UNIQUE ("store_lng")`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "store_lat"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "store_lat" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "UQ_aea4c0c88efb647de9ea091e7bd" UNIQUE ("store_lat")`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "UQ_eb6e17e3d987697c145d0f2064f" UNIQUE ("store_address")`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "UQ_70b7d340b9a5de76490930929de" UNIQUE ("store_name")`);
        await queryRunner.query(`ALTER TABLE "pharmacy" DROP COLUMN "pharmacy_lng"`);
        await queryRunner.query(`ALTER TABLE "pharmacy" ADD "pharmacy_lng" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pharmacy" DROP COLUMN "pharmacy_lat"`);
        await queryRunner.query(`ALTER TABLE "pharmacy" ADD "pharmacy_lat" integer NOT NULL`);
    }

}
