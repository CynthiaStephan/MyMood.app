const path = require('path');
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MyMood API",
            version: "1.0.0",
            description: "API pour le suivi et la visualisation d'humeur",
        },
        servers: [
            {
                url: "http://localhost:3650",
                description: "Serveur de développement",
            },
        ],
    },
    apis: [path.join(__dirname, "routes", "*.js")], // Charge toutes les routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
