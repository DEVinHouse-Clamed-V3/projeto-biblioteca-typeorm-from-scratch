import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class auditoriums1737240923404 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "auditoriums",
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    type: "serial",
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "capacity",
                    type: "integer",
                },
                {
                    name: "location",
                    type: "varchar",
                },
                {
                    name: "has_projector",
                    type: "boolean",
                },
                {
                    name: "has_sound_system",
                    type: "boolean",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                }
            ]
        }),true)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("auditoriums")
    }

}
