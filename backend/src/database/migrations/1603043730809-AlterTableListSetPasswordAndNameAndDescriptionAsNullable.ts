import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterTableListSetPasswordAndNameAndDescriptionAsNullable1603043730809 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'lists',
            'password',
            new TableColumn({
                name: 'password',
                type: 'string',
                isNullable: true,
            })
        )

        await queryRunner.changeColumn(
            'lists',
            'description',
            new TableColumn({
                name: 'description',
                type: 'text',
                isNullable: true,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'lists',
            'password',
            new TableColumn({
                name: 'password',
                type: 'string',
                isNullable: false,
            })
        )

        await queryRunner.changeColumn(
            'lists',
            'description',
            new TableColumn({
                name: 'description',
                type: 'text',
                isNullable: false,
            })
        )
    }
}
