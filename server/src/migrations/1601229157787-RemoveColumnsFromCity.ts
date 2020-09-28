import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveColumnsFromCity1601229157787 implements MigrationInterface {
    name = 'RemoveColumnsFromCity1601229157787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "climate"`);
        await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "lifestyle"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" ADD "lifestyle" character varying`);
        await queryRunner.query(`ALTER TABLE "city" ADD "climate" character varying`);
    }

}
