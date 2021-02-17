import {MigrationInterface, QueryRunner} from "typeorm";

export class init1613577507353 implements MigrationInterface {
    name = 'init1613577507353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(300) NOT NULL, "email" character varying(300), "role" character varying NOT NULL, "gender" character varying NOT NULL, "socialLinks" text NOT NULL DEFAULT '', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titleText" character varying(300) NOT NULL DEFAULT '', "descriptionText" character varying(300) NOT NULL DEFAULT '', "text" character varying NOT NULL DEFAULT '', "imgSrc" character varying(700), "category" character varying NOT NULL, "gender" character varying NOT NULL, "authorId" character varying NOT NULL, "answerId" character varying NOT NULL, "idId" uuid, "categoryId" uuid, "authorIdId" uuid, "answerIdId" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titleText" character varying(300) NOT NULL DEFAULT '', "descriptionText" character varying(300) NOT NULL DEFAULT '', "text" character varying NOT NULL DEFAULT '', "countUseful" integer NOT NULL, "countUseless" integer NOT NULL, "questionId" character varying NOT NULL, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titleText" character varying(300) NOT NULL DEFAULT '', "descriptionText" character varying(300) NOT NULL DEFAULT '', "text" character varying NOT NULL DEFAULT '', "imgSrc" character varying(700), "category" character varying NOT NULL, "gender" character varying NOT NULL, "authorId" character varying NOT NULL, "categoryId" uuid, "authorIdId" uuid, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_d46a8b0150facb8c6ebca5ebf2e" FOREIGN KEY ("idId") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_b8dd754e373b56714ddfa8f545c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_a6b787c97614282666716b50fee" FOREIGN KEY ("authorIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_b462f6f48eaef9d002128fbff22" FOREIGN KEY ("answerIdId") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_12824e4598ee46a0992d99ba553" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_19c78078fa15b458a4bc8b65c45" FOREIGN KEY ("authorIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_19c78078fa15b458a4bc8b65c45"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_12824e4598ee46a0992d99ba553"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_b462f6f48eaef9d002128fbff22"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_a6b787c97614282666716b50fee"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_b8dd754e373b56714ddfa8f545c"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_d46a8b0150facb8c6ebca5ebf2e"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
