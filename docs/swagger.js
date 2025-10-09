const swaggerJsdoc = require('swagger-jsdoc');

const isProduction = process.env.NODE_ENV === 'development';

const serverUrl = isProduction
  ? 'https://medlink-oyqm.onrender.com'
  : 'http://localhost:5000';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Backend API',
      version: '1.0.0',
      description: 'API documentation for a basic Node.js backend with JWT',
    },
    servers: [
      {
        url: serverUrl,
        description: isProduction ? 'Production (Render)' : 'Local Development',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
