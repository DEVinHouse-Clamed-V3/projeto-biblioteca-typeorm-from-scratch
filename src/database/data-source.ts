import "reflect-metadata"
import { DataSource } from "typeorm"
import { Leitor } from "../entities/Leitor"



export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "admin",
    database: "biblioteca",
    synchronize: true,
    logging: true,
    entities: [Leitor],
    migrations: ["src/database/migrations/*.ts"]
})
