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
  consumes: [ 'application/json' ],
  produces: [ 'application/json' ],
  definitions: {
    UserCreationBody: {
      name: 'username',
      email: 'email@gmail.com',
      password: 'password'
    },
    User: {
      id: '1',
      name: 'username',
      email: 'email@gmail.com'
    },
    Users: [
      {
        id: '1',
        name: 'username',
        email: 'email@gmail.com'
      }
    ]
  },
  components: {
    schemas: {
      user: {
        type: 'object',
        requires: [
          'name',
          'email'
        ],
        properties: {
          id: 'string',
          name: 'string',
          email: 'string',
          password: 'string'
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