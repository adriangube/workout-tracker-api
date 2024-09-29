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
    ],
    MuscleGroup: {
      id: '1',
      name: 'Muscle group'
    },
    MuscleGroups: [
      {
        id: '1',
        name: 'Muscle group'
      }
    ],
    MuscleGroupCreationBody: {
      name: 'MuscleGroup'
    }
  }
}

const outputFile = './swagger_output.json'
const endpointsFiles = [ '../routes/index.ts' ]

swaggerAutogen({ openapi: '3.1.0' })(outputFile, endpointsFiles, doc)