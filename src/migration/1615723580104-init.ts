import {MigrationInterface, QueryRunner} from "typeorm";

export class init1615723580104 implements MigrationInterface {
    name = 'init1615723580104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "socialLink" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "link" character varying(300) NOT NULL, "userId" uuid, CONSTRAINT "PK_b8ca41bf52fd437d92fd1888414" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('user', 'author')`);
        await queryRunner.query(`CREATE TYPE "user_gender_enum" AS ENUM('male', 'female', 'female both male')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "seoId" character varying(300) NOT NULL, "name" character varying(300) NOT NULL, "email" character varying, "role" "user_role_enum" NOT NULL, "gender" "user_gender_enum" NOT NULL, "imgSrc" character varying(700), "phone" character varying(100), "description" character varying NOT NULL DEFAULT '', "descriptionHtml" character varying, CONSTRAINT "UQ_d3c5fb758db3b6871cb39a615b9" UNIQUE ("seoId"), CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "article_gender_enum" AS ENUM('male', 'female', 'female both male')`);
        await queryRunner.query(`CREATE TABLE "article" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "seoId" character varying NOT NULL, "title" character varying NOT NULL DEFAULT '', "description" character varying NOT NULL DEFAULT '', "descriptionHtml" character varying, "imgSrc" character varying(700), "gender" "article_gender_enum" NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_cf0dd95232eca5b6afe2a64e872" UNIQUE ("seoId"), CONSTRAINT "UQ_fca3cb9ba4963678f564f22e7a8" UNIQUE ("title"), CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "seoId" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_2951da6f23cc7940f6a1c8547b3" UNIQUE ("seoId"), CONSTRAINT "UQ_9f16dbbf263b0af0f03637fa7b5" UNIQUE ("title"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "question_gender_enum" AS ENUM('male', 'female', 'female both male')`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(300) NOT NULL DEFAULT '', "description" character varying(300) NOT NULL DEFAULT '', "text" character varying NOT NULL DEFAULT '', "imgSrc" character varying(700), "gender" "question_gender_enum" NOT NULL, "userId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(300) NOT NULL DEFAULT '', "description" character varying(300) NOT NULL DEFAULT '', "text" character varying NOT NULL DEFAULT '', "countUseful" integer NOT NULL DEFAULT '0', "countUseless" integer NOT NULL DEFAULT '0', "userId" uuid NOT NULL, "questionId" uuid NOT NULL, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articleCategoriesCategory" ("articleId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_3054140acca2d28dcb16d353668" PRIMARY KEY ("articleId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fa276a902ec9c4adfbf3d96d92" ON "articleCategoriesCategory" ("articleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_015cf58b6a27c66e27789d2cc1" ON "articleCategoriesCategory" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "socialLink" ADD CONSTRAINT "FK_e6b8da0829a92e0e92264bb6136" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_636f17dadfea1ffb4a412296a28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_80f29cc01d0bd1644e389cc13be" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_b8dd754e373b56714ddfa8f545c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_5a26907efcd78a856c8af5829e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articleCategoriesCategory" ADD CONSTRAINT "FK_fa276a902ec9c4adfbf3d96d92b" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articleCategoriesCategory" ADD CONSTRAINT "FK_015cf58b6a27c66e27789d2cc1e" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articleCategoriesCategory" DROP CONSTRAINT "FK_015cf58b6a27c66e27789d2cc1e"`);
        await queryRunner.query(`ALTER TABLE "articleCategoriesCategory" DROP CONSTRAINT "FK_fa276a902ec9c4adfbf3d96d92b"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_5a26907efcd78a856c8af5829e6"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_b8dd754e373b56714ddfa8f545c"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_80f29cc01d0bd1644e389cc13be"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_636f17dadfea1ffb4a412296a28"`);
        await queryRunner.query(`ALTER TABLE "socialLink" DROP CONSTRAINT "FK_e6b8da0829a92e0e92264bb6136"`);
        await queryRunner.query(`DROP INDEX "IDX_015cf58b6a27c66e27789d2cc1"`);
        await queryRunner.query(`DROP INDEX "IDX_fa276a902ec9c4adfbf3d96d92"`);
        await queryRunner.query(`DROP TABLE "articleCategoriesCategory"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TYPE "question_gender_enum"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TYPE "article_gender_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_gender_enum"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "socialLink"`);
    }

}
