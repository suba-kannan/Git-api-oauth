import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration11744037788332 implements MigrationInterface {
    name = 'NewMigration11744037788332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`repo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`full_name\` varchar(255) NOT NULL, \`html_url\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`repo\``);
    }

}
