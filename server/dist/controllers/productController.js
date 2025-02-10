"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const add = async (req, res) => {
    try {
        const { product_id, product_name, category, price } = req.body;
        const [existingprod] = (await db_1.sequelize.query("SELECT * from Products WHERE product_id=:product_id", {
            replacements: {
                product_id,
                product_name,
                category,
                price,
            },
            type: sequelize_1.QueryTypes.SELECT,
        }));
        // if (existingprod) {
        //     res.status(400).json({message: "prod exist"})
        //     return;
        // }
        const result = await db_1.sequelize.query(`INSERT INTO Products (product_id, product_name,category,price) INTO
            VALUES (":product_id,":product_name",":category",":price")) `);
    }
    catch (error) {
        console.log("error in adding");
    }
};
const getproduct = async (req, res) => {
    try {
        const { product_id, product_name, category, price } = req.body;
        const result = (await db_1.sequelize.query(`SELECT * FROM Products`, {
            replacements: {},
            type: sequelize_1.QueryTypes.SELECT,
        }));
    }
    catch (error) {
        console.log("error in getting products");
    }
};
const updateproduct = async (req, res) => {
    try {
        const { product_id, product_name, category, price } = req.body;
        const result = (await db_1.sequelize.query(` `));
    }
    finally {
    }
};
const deleteproduct = async (req, res) => {
    try {
        const { product_id } = req.body;
        const [product];
    }
    catch (error) {
        console.log("error in deleting products");
    }
};
