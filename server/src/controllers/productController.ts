import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "../config/db";
import Product from "../models/Product";
import { QueryTypes } from "sequelize";


const add = async (req: Request, res: Response): Promise<void> {
    try {
        const { product_id, product_name, category, price }: any = req.body;

        const [existingprod] = (await sequelize.query("SELECT * from Products WHERE product_id=:product_id",
            {
                replacements: {
                    product_id,
                    product_name,
                    category,
                    price,
                },
                type: QueryTypes.SELECT,

            }
        ));

        // if (existingprod) {
        //     res.status(400).json({message: "prod exist"})
        //     return;
        // }
        const newprod = await sequelize.query(
            `INSERT INTO Products (product_id, product_name,category,price) INTO
            VALUES (":product_id,":product_name",":category",":price") `,
            {
                replacements: {
                    product_id,
                    product_name,
                    category,
                    price,
                },
                type: QueryTypes.INSERT,
            }
        );







    } catch (error) {
        console.log("error in adding");
    }
}

const getproduct = async (req: Request, res: Response): Promise<void> {
    try {
        const { product_id, product_name, category, price }: any = req.body;
        const result = (await sequelize.query(`SELECT * FROM Products`
            {
                replacements: {},
                type: QueryTypes.SELECT,
            }
        )
        );

        const { id } = req.body.user;
        console.log("id ", id);

        const allprod = await sequelize.query("SELECT * FROM Products ");
    } catch (error) {
        console.log("error in getting products");
    }

}

const updateproduct = async (req: Request, res: Response): Promise<void> {
    try {
        const { product_id, product_name, category, price }: any = req.body;
        const result = (await sequelize.query(` `))
    }
}

const deleteproduct = async (req: Request, res: Response): Promise<void> {
    try {
        const { product_id } = req.body
        const [product]

    } catch (error) {
        console.log("error in deleting products");
    }
}