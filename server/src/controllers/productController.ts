import type { Request, Response } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
import { sequelize } from "../config/db";
import { QueryTypes } from "sequelize";

/**
 * Adds a new product to the database.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const add = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_name, category, price, stock } = req.body;

        const [result] = await sequelize.query(
            `INSERT INTO Products (product_name, category, price, stock)
            VALUES (:product_name, :category, :price, :stock)`,
            {
                replacements: { product_name, category, price, stock },
                type: QueryTypes.INSERT,
            }
        );

        const newProductId = (result as any)[0];
        const [newProduct] = await sequelize.query(
            "SELECT * FROM Products WHERE product_id = :id",
            {
                replacements: { id: newProductId },
                type: QueryTypes.SELECT,
            }
        );

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

/**
 * Retrieves all products from the database.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await sequelize.query(
            "SELECT * FROM Products",
            { type: QueryTypes.SELECT }
        );

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

/**
 * Retrieves a single product by its ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const [product] = await sequelize.query(
            "SELECT * FROM Products WHERE product_id = :id",
            {
                replacements: { id },
                type: QueryTypes.SELECT,
            }
        );

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

/**
 * Updates an existing product by its ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { product_name, category, price, stock } = req.body;

        const [updated] = await sequelize.query(
            `UPDATE Products 
             SET product_name = :product_name, category = :category, price = :price, stock = :stock 
             WHERE product_id = :id`,
            {
                replacements: { id, product_name, category, price, stock },
                type: QueryTypes.UPDATE,
            }
        );

        if (updated === 0) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        const [updatedProduct] = await sequelize.query(
            "SELECT * FROM Products WHERE product_id = :id",
            {
                replacements: { id },
                type: QueryTypes.SELECT,
            }
        );

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

/**
 * Deletes a product by its ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const result = await sequelize.query(
            "DELETE FROM Products WHERE product_id = :id",
            {
                replacements: { id },
                type: QueryTypes.DELETE,
            }
        );

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

const controller = {
    add,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
export default controller;
