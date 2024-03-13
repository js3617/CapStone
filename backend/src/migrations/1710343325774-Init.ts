import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1710343325774 implements MigrationInterface {
    name = 'Init1710343325774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pharmacy_time" ("id" SERIAL NOT NULL, "pharmacy_id" integer NOT NULL, "day" integer NOT NULL, "openTIme" character varying NOT NULL, "closeTime" character varying NOT NULL, "open24" boolean NOT NULL, "pharmacyPharmacyId" uuid, CONSTRAINT "PK_0cb4f72c9e8d43ffec5aeeb28ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pharmacy" ("pharmacy_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" integer NOT NULL, "pharmacy_name" character varying NOT NULL, "pharmacy_address" character varying NOT NULL, "pharmacy_lat" numeric NOT NULL, "pharmacy_lng" numeric NOT NULL, CONSTRAINT "UQ_c790412594a4e0fbe9b10db78e4" UNIQUE ("pharmacy_name"), CONSTRAINT "PK_e17ca771faa0b6131a2d587c82c" PRIMARY KEY ("pharmacy_id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" uuid NOT NULL, "pharmacy_id" uuid NOT NULL, "product_name" character varying NOT NULL, "product_description" character varying NOT NULL, "product_taking" character varying NOT NULL, "product_classify" character varying NOT NULL, CONSTRAINT "UQ_aff16b2dbdb8fa56d29ed91e288" UNIQUE ("product_name"), CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("store_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" integer NOT NULL, "store_name" character varying NOT NULL, "store_address" character varying NOT NULL, "store_lat" double precision NOT NULL, "store_lng" double precision NOT NULL, CONSTRAINT "PK_94d7b0f600366ceb5c960069687" PRIMARY KEY ("store_id"))`);
        await queryRunner.query(`ALTER TABLE "pharmacy_time" ADD CONSTRAINT "FK_38217e8da9ad2eeb8df315cd6a3" FOREIGN KEY ("pharmacyPharmacyId") REFERENCES "pharmacy"("pharmacy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4fb20f5e0d195dcc2e27e8cc815" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_e508554a0ebc6f4234e818097e6" FOREIGN KEY ("pharmacy_id") REFERENCES "pharmacy"("pharmacy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_e508554a0ebc6f4234e818097e6"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4fb20f5e0d195dcc2e27e8cc815"`);
        await queryRunner.query(`ALTER TABLE "pharmacy_time" DROP CONSTRAINT "FK_38217e8da9ad2eeb8df315cd6a3"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "pharmacy"`);
        await queryRunner.query(`DROP TABLE "pharmacy_time"`);
    }

}
