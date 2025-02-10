"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
// import productRoutes from "./routes/productRoutes";
const syncmodel_1 = __importDefault(require("./models/syncmodel"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use("/api/Product",productRoutes);
const startServer = async () => {
    try {
        await db_1.sequelize.authenticate();
        console.log("database connected successfully");
        await (0, syncmodel_1.default)();
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("unable to connect", error);
    }
};
startServer();
