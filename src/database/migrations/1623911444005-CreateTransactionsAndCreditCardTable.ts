import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTransactionsAndCreditCardTable1623911444005 implements MigrationInterface {
    name = 'CreateTransactionsAndCreditCardTable1623911444005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "creditcards" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "card_number" character varying NOT NULL,
                "card_holder_name" character varying NOT NULL,
                "value" integer NOT NULL,
                "cvv" integer NOT NULL,
                "exp_date" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_731b9a6ceb9d0dc4f07feeae402" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "transactions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "client_id" character varying NOT NULL,
                "client_name" character varying NOT NULL,
                "total_to_pay" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "transactions"
        `);
        await queryRunner.query(`
            DROP TABLE "creditcards"
        `);
    }

}
