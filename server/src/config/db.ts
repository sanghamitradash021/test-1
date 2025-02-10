import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()

export const sequelize = new Sequelize(

    process.env.DB_NAME || "inventory",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "rootjerry",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false,
    },

)