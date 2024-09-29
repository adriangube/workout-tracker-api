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
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      }
    }
  },
  consumes: [ 'application/json' ],
  produces: [ 'application/json' ],
  definitions: {
    UserCreationBody: {
      username: 'username',
      email: 'email@gmail.com',
      password: 'password'
    },
    User: {
      id: '1',
      username: 'username',
      email: 'email@gmail.com'
    },
    Users: [
      {
        id: '1',
        username: 'username',
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
    },
    Exercise: {
      id: '1',
      name: 'Exercise',
      description: 'Description of the exercise',
      muscle_groups: [
        { id: '1', name: 'Muscle group' }
      ]
    },
    Exercises: [
      {
        id: '1',
        name: 'Exercise',
        description: 'Description of the exercise',
        muscle_groups: [
          { id: '1', name: 'Muscle group' }
        ]
      }
    ],
    ExerciseCreationBody: {
      name: 'Exercise',
      description: 'Description of te exercise',
      muscle_groups_id: [ '1' ]
    }, 
    LoginBody: {
      username: 'username',
      password: 'password'
    },
    LoginResponse: {
      token: 'token'
    }
  }
}

const outputFile = './swagger_output.json'
const endpointsFiles = [ '../routes/index.ts' ]

swaggerAutogen({ openapi: '3.1.0' })(outputFile, endpointsFiles, doc)