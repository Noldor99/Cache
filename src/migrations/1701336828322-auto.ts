import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701336828322 implements MigrationInterface {
    name = 'Auto1701336828322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "power" ("id" SERIAL NOT NULL, "power" character varying NOT NULL, CONSTRAINT "PK_9b965296b9f26727d54a5a0620e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "power"`);
    }

}
