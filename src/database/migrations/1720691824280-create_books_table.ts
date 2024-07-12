import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBooksTable1720691824280 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'books',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'author',
                        type: 'varchar',
                    },
                    {
                        name: 'stock',
                        type: 'int',
                    },
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('books')
    }

}
