import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLifestyleColumnToCity1601228514218 implements MigrationInterface {
    name = 'AddLifestyleColumnToCity1601228514218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" ADD "lifestyle" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "lifestyle"`);
    }

}
