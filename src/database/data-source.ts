import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Audi3354.",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    extra: {
        connectTimeoutMS: 30000 
    }
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source inicializado com sucesso!");
    })
    .catch((err) => {
        console.error("Erro ao inicializar o Data Source", err);
    });