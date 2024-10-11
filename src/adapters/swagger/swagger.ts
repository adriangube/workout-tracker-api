import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Workout Tracker API',
    description: 'A workout tracker made for you'
  },
  tags: [
    {
      name: 'Auth'
    },
    {
      name: 'Users'
    },
    {
      name: 'Exercises'
    },
    {
      name: 'Muscle Groups'
    },
    {
      name: 'Workout Template'
    },
    {
      name: 'Internal',
      description: 'Restricted endpoints for internal usage only.'
    }
  ],
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
    },
    AllWorkoutTemplates: [
      {
        id: '1',
        user_id: '2',
        name: 'Workout template name',
        exercises: [
          {
            id: '3',
            template_id: '1',
            sets: 3,
            reps: 10,
            weight: 15,
            name: 'Exercise',
            description: 'Description of the exercise'
          }
        ]
      }
    ],
    WorkoutTemplate: {
      id: '1',
      user_id: '2',
      name: 'Workout template name',
      exercises: [
        {
          id: '3',
          template_id: '1',
          sets: 3,
          reps: 10,
          weight: 15,
          name: 'Exercise',
          description: 'Description of the exercise'
        }
      ]
    },
    CreateWorkoutTemplateBody: {
      user_id: '2',
      name: 'Workout template name',
      exercises: [
        {
          exercise_id: '3',
          sets: 3,
          reps: 15,
          weight: 25
        }
      ]
    }
  }
}

const outputFile = './swagger_output.json'
const endpointsFiles = [ '../routes/index.ts' ]

swaggerAutogen({ openapi: '3.1.0' })(outputFile, endpointsFiles, doc)