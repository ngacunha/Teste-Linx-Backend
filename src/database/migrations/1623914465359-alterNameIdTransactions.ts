import {MigrationInterface, QueryRunner} from "typeorm";

export class alterNameIdTransactions1623914465359 implements MigrationInterface {
    name = 'alterNameIdTransactions1623914465359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transactions"
                RENAME COLUMN "id" TO "purchase_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "transactions"
                RENAME CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" TO "PK_c62e594014201fbc3d61cb311e3"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transactions"
                RENAME CONSTRAINT "PK_c62e594014201fbc3d61cb311e3" TO "PK_a219afd8dd77ed80f5a862f1db9"
        `);
        await queryRunner.query(`
            ALTER TABLE "transactions"
                RENAME COLUMN "purchase_id" TO "id"
        `);
    }

}
