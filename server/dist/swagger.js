"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Inventory Management System API',
            version: '1.0.0',
            description: 'API for managing products and stock',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/productRoutes.ts'],
};
const specs = (0, swagger_jsdoc_1.default)(options);
const swaggerDocs = (app, port) => {
    // Swagger UI page
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: "API Documentation",
    }));
    // Swagger JSON documentation
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });
    console.log(`📚 Docs available at http://localhost:${port}/docs`);
};
exports.swaggerDocs = swaggerDocs;
