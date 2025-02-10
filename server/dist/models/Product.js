"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Product extends sequelize_1.Model {
    product_id;
    product_name;
    category;
    price;
    stock;
}
Product.init({
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "Products",
    timestamps: false,
});
exports.default = Product;
