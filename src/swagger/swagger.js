const swaggerSpec = require('../../config/swagger');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'swagger-docs.json');

fs.writeFileSync(filePath, JSON.stringify(swaggerSpec, null, 2));

console.log('Swagger documentation saved to', filePath);