import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBorrowedTable1720711485643 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'borrowed',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'member_id',
                        type: 'int',                    
                    },
                    {
                        name: 'book_id',
                        type: 'int',
                    },
                    {
                        name: 'borrowed_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'returned_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                ]
            }),
            true
        )

        queryRunner.clearSqlMemory()

        await queryRunner.createForeignKeys('borrowed', [
            new TableForeignKey({
                columnNames: ['member_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'members',
                onDelete: 'CASCADE'
            }),
            new TableForeignKey({
                columnNames: ['book_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'books',
                onDelete: 'CASCADE'
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('borrowed')
    }

}
