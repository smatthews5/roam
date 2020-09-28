import {MigrationInterface, QueryRunner} from "typeorm";

export class AddClimateColumnToCity1601234915145 implements MigrationInterface {
    name = 'AddClimateColumnToCity1601234915145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" ADD "lifestyle" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "lifestyle"`);
    }

}
