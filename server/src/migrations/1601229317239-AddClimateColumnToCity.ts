import {MigrationInterface, QueryRunner} from "typeorm";

export class AddClimateColumnToCity1601229317239 implements MigrationInterface {
    name = 'AddClimateColumnToCity1601229317239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" ADD "climate" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "climate"`);
    }

}
