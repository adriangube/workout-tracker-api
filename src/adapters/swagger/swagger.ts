import swaggerAutogen from 'swagger-autogen'

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
    schemas: {
      user: {
        type: 'object',
        requires: [
          'name',
          'email'
        ],
        properties: {
          id: {
            type: 'string'
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          }
        },
        example: {
          id: '1',
          name: 'username',
          email: 'email@gmail.com',
          password: 'password'
        }
      },
      errorMessage: {
        type: 'object',
        required: [
          'message'
        ],
        properties: {
          message: {
            type: 'string'
          }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      }
    }
  }
}

const outputFile = './swagger_output.json'
const endpointsFiles = [ '../routes/index.ts' ]

swaggerAutogen({ openapi: '3.1.0' })(outputFile, endpointsFiles, doc)