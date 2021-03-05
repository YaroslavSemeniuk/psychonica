import { MigrationInterface, QueryRunner } from 'typeorm';

export class update1614937741709 implements MigrationInterface {
    name = 'update1614937741709'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('COMMENT ON COLUMN "category"."description" IS NULL');
      await queryRunner.query('ALTER TABLE "category" DROP CONSTRAINT "UQ_7b7115fda47b20b277b8ca6f89f"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "category" ADD CONSTRAINT "UQ_7b7115fda47b20b277b8ca6f89f" UNIQUE ("description")');
      await queryRunner.query('COMMENT ON COLUMN "category"."description" IS NULL');
    }
}
