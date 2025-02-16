"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controllers/productController"));
// import { ParsedQs } from 'qs';
const router = express_1.default.Router();
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
    productController_1.default.getAllProducts(req, res);
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
    productController_1.default.getProductById(req, res);
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
    productController_1.default.add(req, res);
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
    productController_1.default.updateProduct(req, res);
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
    productController_1.default.deleteProduct(req, res);
});
exports.default = router;
