import {MigrationInterface, QueryRunner} from "typeorm";

export class joinTransactionCreditCard1623917969972 implements MigrationInterface {
    name = 'joinTransactionCreditCard1623917969972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transactions"
            ADD "creditCardId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "transactions"
            ADD CONSTRAINT "UQ_3dd17acf02d80e4907712f13fdc" UNIQUE ("creditCardId")
        `);
        await queryRunner.query(`
            ALTER TABLE "transactions"
            ADD CONSTRAINT "FK_3dd17acf02d80e4907712f13fdc" FOREIGN KEY ("creditCardId") REFERENCES "creditcards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transactions" DROP CONSTRAINT "FK_3dd17acf02d80e4907712f13fdc"
        `);
        await queryRunner.query(`
            ALTER TABLE "transactions" DROP CONSTRAINT "UQ_3dd17acf02d80e4907712f13fdc"
        `);
        await queryRunner.query(`
            ALTER TABLE "transactions" DROP COLUMN "creditCardId"
        `);
    }

}
