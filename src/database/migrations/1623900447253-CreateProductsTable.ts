import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProductsTable1623900447253 implements MigrationInterface {
    name = 'CreateProductsTable1623900447253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "price" integer NOT NULL,
                "zipcode" character varying NOT NULL,
                "seller" character varying NOT NULL,
                "thumbnailHd" character varying NOT NULL,
                "date" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "products"
        `);
    }

}
