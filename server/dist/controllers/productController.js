"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import cors from "cors";
// import dotenv from "dotenv";
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const add = async (req, res) => {
    try {
        const { product_name, category, price, stock } = req.body;
        const [result] = await db_1.sequelize.query(`INSERT INTO Products (product_name, category, price, stock)
            VALUES (:product_name, :category, :price, :stock)`, {
            replacements: { product_name, category, price, stock },
            type: sequelize_1.QueryTypes.INSERT,
        });
        const newProductId = result[0];
        const [newProduct] = await db_1.sequelize.query("SELECT * FROM Products WHERE product_id = :id", {
            replacements: { id: newProductId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};
const getAllProducts = async (req, res) => {
    try {
        const products = await db_1.sequelize.query("SELECT * FROM Products", { type: sequelize_1.QueryTypes.SELECT });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const [product] = await db_1.sequelize.query("SELECT * FROM Products WHERE product_id = :id", {
            replacements: { id },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, category, price, stock } = req.body;
        const [updated] = await db_1.sequelize.query(`UPDATE Products 
             SET product_name = :product_name, category = :category, price = :price, stock = :stock 
             WHERE product_id = :id`, {
            replacements: { id, product_name, category, price, stock },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        if (updated === 0) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        const [updatedProduct] = await db_1.sequelize.query("SELECT * FROM Products WHERE product_id = :id", {
            replacements: { id },
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db_1.sequelize.query("DELETE FROM Products WHERE product_id = :id", {
            replacements: { id },
            type: sequelize_1.QueryTypes.DELETE,
        });
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
const controller = {
    add: add,
    getAllProducts: getAllProducts,
    getProductById: getProductById,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
};
exports.default = controller;
