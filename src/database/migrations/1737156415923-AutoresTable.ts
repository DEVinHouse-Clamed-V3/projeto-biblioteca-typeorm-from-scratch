import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class AutoresTable1737156415923 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'autores',
                columns: [{
                    name: 'id',
                    isPrimary: true,
                    type: 'serial'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '150'
                },
                {
                    name: 'birthdate',
                    type: 'date'
                },
                {
                    name: 'biography',
                    type: 'text'
                },
                {
                    name: 'nationality',
                    type: 'varchar',
                    length: '150'
                },
                {
                    name: 'active',
                    type: 'boolean'
                },
                {
                    name: 'created_at',
                    type: 'timestamp'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp'
                }
                ]
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
