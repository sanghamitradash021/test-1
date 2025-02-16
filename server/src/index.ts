import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db";
import productRoutes from "./routes/productRoutes";
import syncTables from "./models/syncmodel";
import { swaggerDocs } from "./swagger";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

swaggerDocs(app, PORT);

app.use(cors());
app.use(express.json());

/**
 * Registers product-related routes under `/api/Product`.
 */
app.use("/api/Product", productRoutes);

/**
 * Starts the Express server and initializes database connection.
 * It first authenticates the Sequelize connection and syncs tables before listening on the specified port.
 * @async
 * @function startServer
 */
const startServer = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");

        await syncTables();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database", error);
    }
};

// Start the server
startServer();
