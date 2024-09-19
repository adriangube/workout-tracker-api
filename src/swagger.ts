import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Workout Tracker API',
        description: 'A workout tracker made for you'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen({openapi: '3.1.0'})(outputFile, endpointsFiles, doc);