import swaggerAutogen from 'swagger-autogen'
import '@/app/config/env'
import { config } from '@/app/config'
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
      name: 'Workout Template Exercises'
    },
    {
      name: 'Workouts'
    },
    {
      name: 'Workout Exercises'
    },
    {
      name: 'Internal',
      description: 'Restricted endpoints for internal usage only.'
    }
  ],
  servers: [
  
    process.env.NODE_ENV === 'production' ? {
      url: `https://${config.HOST}:${config.PORT}`,
      description: 'Production Environment'
    } : {
      url: `http://${config.HOST}:${config.PORT}`,
      description: 'Dev Environment'
    }
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
    },
    WorkoutTemplateExercise: {
      id: '3',
      template_id: '1',
      sets: 3,
      reps: 10,
      weight: 15,
      name: 'Exercise',
      description: 'Description of the exercise'
    },
    WorkoutTemplateExercises: [
      {
        id: '3',
        template_id: '1',
        sets: 3,
        reps: 10,
        weight: 15,
        name: 'Exercise',
        description: 'Description of the exercise'
      }
    ],
    WorkoutTemplateExerciseCreationBody: {
      template_id: '1',
      exercise_id: '3',
      sets: 3,
      reps: 15,
      weight: 25
    },
    Workout: {
      id: '1',
      user_id: '2',
      name: 'Workout Name',
      status: 'started',
      start_date: 'Wed Oct 16 2024 20:16:20 GMT+0100',
      end_date: 'Wed Oct 16 2024 21:16:20 GMT+0100',
      exercises: [
        {
          id: '3',
          workout_id: '1',
          name: 'Exercise name',
          description: 'Exercise description',
          sets: 3,
          reps: 10,
          weight: 25,
          notes: 'Notes about the exercise'
        }
      ]
    },
    AllWorkouts: [
      {
        id: '1',
        user_id: '2',
        name: 'Workout Name',
        status: 'started',
        start_date: 'Wed Oct 16 2024 20:16:20 GMT+0100',
        end_date: 'Wed Oct 16 2024 21:16:20 GMT+0100',
        exercises: [
          {
            id: '3',
            workout_id: '1',
            name: 'Exercise name',
            description: 'Exercise description',
            sets: 3,
            reps: 10,
            weight: 25,
            notes: 'Notes about the exercise'
          }
        ]
      }
    ],
    StartWorkoutBody: {
      templateId: '2'
    },
    UpdateWorkoutBody: {
      exercises: [
        {
          id: '3',
          sets: 3,
          reps: 10,
          weight: 25,
          notes: 'Notes about the exercise'
        }
      ],
      end_date: 'Wed Oct 16 2024 21:16:20 GMT+0100'
    },
    WorkoutExercise: {
      id: '3',
      workout_id: '1',
      name: 'Exercise name',
      description: 'Exercise description',
      sets: 3,
      reps: 10,
      weight: 25,
      notes: 'Notes about the exercise'
    },
    WorkoutExercises: [
      {
        id: '3',
        workout_id: '1',
        name: 'Exercise name',
        description: 'Exercise description',
        sets: 3,
        reps: 10,
        weight: 25,
        notes: 'Notes about the exercise'
      }
    ],
    UpdateWorkoutExercise: {
      id: '3',
      sets: 3,
      reps: 10,
      weight: 25,
      notes: 'Notes about the exercise'
    }
  }
}

const outputFile = './swagger_output.json'
const endpointsFiles = [ '../routes/index.ts' ]

swaggerAutogen({ openapi: '3.1.0' })(outputFile, endpointsFiles, doc)