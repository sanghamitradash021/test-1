import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db";
import productRoutes from "./routes/productRoutes";
import syncTables from "./models/syncmodel";


dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 3000

app.use(cors());
app.use(express.json());


app.use("/api/Product", productRoutes);


const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("database connected successfully");

        await syncTables();

        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("unable to connect", error);
    }
};

startServer();