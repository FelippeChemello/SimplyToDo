import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTableToDoItems1602879438017 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'todoItems',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'listId',
                        type: 'integer',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'text',
                    },
                    {
                        name: 'isDone',
                        type: 'boolean',
                    },
                    {
                        name: 'createdDate',
                        type: 'timestamp',
                    },
                    {
                        name: 'updatedDate',
                        type: 'timestamp',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ListTodoItems',
                        columnNames: ['listId'],
                        referencedTableName: 'lists',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images')
    }
}
