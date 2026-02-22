import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import { useExpressServer } from 'routing-controllers';
import { AppDataSource } from "./data-source.js";
import { SubscriptionController } from './controllers/SubscriptionController.js';

const app = express();

// Middleware
app.use(express.json());

// Logging Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Register routing-controllers
useExpressServer(app, {
    controllers: [SubscriptionController],
});

// Root Route
app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Welcome to the TypeORM Backend API",
        available_endpoints: [
            { path: "/status", description: "Health check" },
            { path: "/api/subscriptions", description: "Manage subscriptions" }
        ]
    });
});

// Test Route
app.get("/status", (req: Request, res: Response) => {
    res.json({ message: "Backend is running and DB is connected!" });
});

// Initialize DB and Start Server
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        const PORT = 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });