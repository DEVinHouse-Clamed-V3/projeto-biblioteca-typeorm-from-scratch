import "reflect-metadata"
import { DataSource } from "typeorm"
import { Livro } from "../entities/Livro"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Boinha123",
    database: "Books",
    synchronize: true,
    logging: true,
    entities: [Livro],
    migrations: ["src/database/migrations/*.ts"]
})
