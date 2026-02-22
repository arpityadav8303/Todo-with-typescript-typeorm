import "reflect-metadata";
import { DataSource } from "typeorm";
import { Subscription } from "./entities/Subscription.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "ArpitYad12@#",
    database: "myapp_db",
    synchronize: true, // Auto-creates/updates tables based on your Entities
    logging: true,     // Log SQL queries to console
    entities: [Subscription],      // We will add classes here shortly
    subscribers: [],
    migrations: [],
});