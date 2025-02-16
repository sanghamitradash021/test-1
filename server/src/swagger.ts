import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express, Request, Response } from 'express';

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

const specs = swaggerJsdoc(options);

export const swaggerDocs = (app: Express, port: number): void => {
    // Swagger UI page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: "API Documentation",
    }));

    // Swagger JSON documentation
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });

    console.log(`📚 Docs available at http://localhost:${port}/docs`);
};