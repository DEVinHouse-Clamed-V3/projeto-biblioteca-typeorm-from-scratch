import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ReadersTable1737051035672 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('rodando migraion')
    await queryRunner.createTable(
      new Table({
        name: "readers",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "serial",
          },
          {
            name: "name",
            type: "varchar",
            length: "150",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "150",
          },
          {
            name: "phone_number",
            type: "varchar",
            length: "20",
          },
          {
            name: "birthdate",
            type: "date",
          },
          {
            name: "address",
            type: "text",
          },
          {
            name: "active",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("readers");
  }
}
