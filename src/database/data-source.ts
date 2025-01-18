import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "biblioteca",
    synchronize: true,
    logging: true,
    entities: ["src/entity/*.ts"],
    migrations: ["src/database/migrations/*.ts"]
})
