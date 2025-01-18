import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "project_typeorm",
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: ["src/database/migrations/*.ts"]
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source inicializado com sucesso!");
    })
    .catch((err) => {
        console.error("Erro ao inicializar o Data Source", err);
    });