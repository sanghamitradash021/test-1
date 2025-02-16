
import express from "express"
import controller from "../controllers/productController"
// import { ParsedQs } from 'qs';

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve all products
 *     responses:
 *       200:
 *         description: A list of products
 */


router.get("/products", (req, res) => {
    controller.getAllProducts(req, res);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a single product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single product
 */
router.get('/:id', (req, res) => {
    controller.getProductById(req, res);
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               stockQuantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/new", (req, res) => {
    controller.add(req, res)
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               stockQuantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/:id', (req, res) => {
    controller.updateProduct(req, res);
});



/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/:id', (req, res) => {
    controller.deleteProduct(req, res);
});

export default router