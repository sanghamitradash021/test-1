
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db"

class Product extends Model {
    public product_id!: number
    public product_name!: string
    public category!: string
    public price!: number
    public stock!: number


}

Product.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,


        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
    },
    {
        sequelize,
        tableName: "Products",
        timestamps: false,
    }
)