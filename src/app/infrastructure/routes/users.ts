import express, { NextFunction, Request, Response } from 'express'

import { UserRepositoryImpl } from '@/user/infrastructure/UserRepositoryImpl'
import { UserService } from '@/user/application/UserService'
import { UserController } from '@/user/infrastructure/UserController'

import { AuthService } from '@/auth/application/AuthService'

import { WorkoutTemplateRepositoryImpl } from '@/workoutTemplate/infrastructure/WorkoutTemplateRepositoryImpl'
import { WorkoutTemplateService } from '@/workoutTemplate/application/WorkoutTemplateService'
import { WorkoutTemplateController } from '@/workoutTemplate/infrastructure/WorkoutTemplateController'

import {
  WorkoutTemplateExerciseRepositoryImpl
} from '@/workoutTemplateExercises/infrastructure/WorkoutTemplateExerciseRepositoryImpl'
import { WorkoutTemplateExerciseService } from '@/workoutTemplateExercises/application/WorkoutTemplateExerciseService'
import {
  WorkoutTemplateExerciseController
} from '@/workoutTemplateExercises/infrastructure/WorkoutTemplateExerciseController'

import { WorkoutRepositoryImpl } from '@/workout/infrastructure/WorkoutRepositoryImpl'
import { WorkoutService } from '@/workout/application/WorkoutService'
import { WorkoutController } from '@/workout/infrastructure/WorkoutController'

import { WorkoutExerciseRepositoryImpl } from '@/workoutExercise/infrastructure/WorkoutExerciseRepositoryImpl'
import { WorkoutExerciseService } from '@/workoutExercise/application/WorkoutExerciseService'
import { WorkoutExerciseController } from '@/workoutExercise/infrastructure/WorkoutExerciseController'

export const usersRouter = express.Router() 

const userRepository = new UserRepositoryImpl()
const userService = new UserService(userRepository)
const authService = new AuthService(userRepository)
const userController = new UserController(userService, authService)

const workoutTemplateRepository = new WorkoutTemplateRepositoryImpl()
const workoutTemplateService = new WorkoutTemplateService(workoutTemplateRepository)
const workoutTemplateController = new WorkoutTemplateController(workoutTemplateService)

const workoutTemplateExerciseRepository = new WorkoutTemplateExerciseRepositoryImpl()
const workoutTemplateExerciseService = new WorkoutTemplateExerciseService(workoutTemplateExerciseRepository)
const workoutTemplateExerciseController = new WorkoutTemplateExerciseController(workoutTemplateExerciseService)

const workoutRepository = new WorkoutRepositoryImpl()
const workoutService = new WorkoutService(workoutRepository)
const workoutController = new WorkoutController(workoutService)

const workoutExerciseRepository = new WorkoutExerciseRepositoryImpl()
const workoutExerciseService = new WorkoutExerciseService(workoutExerciseRepository)
const workoutExerciseController = new WorkoutExerciseController(workoutExerciseService)

usersRouter.get('/:id', (res: Request, req: Response, next: NextFunction) => {
  /*  
  #swagger.tags = ['Users']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/User" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Get user by id
*/
  userController.getUser(res, req, next)
})

usersRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Internal']
  #swagger.responses[200] = { schema:{ "type": "array", $ref: "#/definitions/Users" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Get all users
*/
  userController.getAllUsers(req, res, next)
})

usersRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Users']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/UserCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/User" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Create a user
*/
  userController.createUser(req, res, next)
})

usersRouter.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Users']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/UserCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/User" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Partially update a user
*/
  userController.updateUser(req, res, next)
})

usersRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Internal']
  #swagger.responses[200] = { }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Delete a user
*/
  userController.deleteUser(req, res, next)
})

usersRouter.get('/:id/workout-templates', (req: Request, res: Response, next: NextFunction) => {
  /*  
  #swagger.tags = ['Workout Template']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/AllWorkoutTemplates" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Get all workout templates from a user
*/
  workoutTemplateController.getAllWorkoutTemplatesByUserId(req, res, next)
})

usersRouter.get('/:id/workout-templates/:templateId', (req: Request, res: Response, next: NextFunction) => {
  /*  
    #swagger.tags = ['Workout Template']
    #swagger.responses[200] = { schema:{ $ref: "#/definitions/WorkoutTemplate" } }
    #swagger.security = [{"bearerAuth": []}]
    #swagger.description = Get a workout template
  */

  workoutTemplateController.getWorkoutTemplatesById(req, res, next)
})

usersRouter.post('/:id/workout-templates', (req: Request, res: Response, next: NextFunction) => {
  /*  
    #swagger.tags = ['Workout Template']
    #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/CreateWorkoutTemplateBody" } }
    #swagger.responses[200] = { schema:{ $ref: "#/definitions/WorkoutTemplate" } }
    #swagger.security = [{"bearerAuth": []}]
    #swagger.description = Create a workout template
  */

  workoutTemplateController.createWorkoutTemplate(req, res, next)
})

usersRouter.delete('/:id/workout-templates/:templateId', (req: Request, res: Response, next: NextFunction) => {
  /*  
    #swagger.tags = ['Workout Template']
    #swagger.responses[200] = { }
    #swagger.security = [{"bearerAuth": []}]
    #swagger.description = Delete a workout template
  */

  workoutTemplateController.deleteWorkoutTemplate(req, res, next)
})

usersRouter.get('/:id/workout-templates/:templateId/exercises', (req: Request, res: Response, next: NextFunction) => {
  /*  
    #swagger.tags = ['Workout Template Exercises']
    #swagger.responses[200] = { schema:{ $ref: "#/definitions/WorkoutTemplateExercises" } }
    #swagger.security = [{"bearerAuth": []}]
    #swagger.description = Get the exercises from a workout template
  */

  workoutTemplateExerciseController.getAllWorkoutTemplateExerciseByWorkoutTemplateId(req, res, next)
})

usersRouter.get('/:id/workout-templates/:templateId/exercises/:templateExerciseId', (
  req: Request, res: Response, next: NextFunction
) => {
  /*  
    #swagger.tags = ['Workout Template Exercises']
    #swagger.responses[200] = { schema:{ $ref: "#/definitions/WorkoutTemplateExercise" } }
    #swagger.security = [{"bearerAuth": []}]
    #swagger.description = Get a exercise from a workout template
  */

  workoutTemplateExerciseController.getWorkoutTemplateExerciseById(req, res, next)
})

usersRouter.post('/:id/workout-templates/:templateId/exercises', (
  req: Request, res: Response, next: NextFunction
) => {
  /*  
    #swagger.tags = ['Workout Template Exercises']
    #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/WorkoutTemplateExerciseCreationBody" } }
    #swagger.responses[200] = { schema:{ $ref: "#/definitions/WorkoutTemplateExercise" } }
    #swagger.security = [{"bearerAuth": []}]
    #swagger.description = Add a exercise into a workout template
  */

  workoutTemplateExerciseController.createWorkoutTemplateExercise(req, res, next)
})

usersRouter.delete('/:id/workout-templates/:templateId/exercises/:templateExerciseId', (
  req: Request, res: Response, next: NextFunction
) => {
  /*  
    #swagger.tags = ['Workout Template Exercises']
    #swagger.responses[200] = {  } }
    #swagger.security = [{"bearerAuth": []}]
    #swagger.description = Delete a exercise from a workout template
  */

  workoutTemplateExerciseController.deleteWorkoutTemplateExercise(req, res, next)
})

usersRouter.get('/:id/workouts', (req: Request, res: Response, next: NextFunction) => {
  /*  
  #swagger.tags = ['Workouts']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/AllWorkouts" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Get all workouts from a user
*/
  workoutController.getAllWorkoutsByUserId(req, res, next)
})

usersRouter.get('/:id/workouts/:workoutId', (req: Request, res: Response, next: NextFunction) => {
  /*  
  #swagger.tags = ['Workouts']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/Workout" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Get a workout
*/
  workoutController.getWorkoutById(req, res, next)
})

usersRouter.post('/:id/workouts', (req: Request, res: Response, next: NextFunction) => {
  /*  
  #swagger.tags = ['Workouts']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/StartWorkoutBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/Workout" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Start a workout
*/
  workoutController.startWorkout(req, res, next)
})

usersRouter.patch('/:id/workouts/:workoutId', (req: Request, res: Response, next: NextFunction) => {
  /*  
  #swagger.tags = ['Workouts']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/UpdateWorkoutBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/Workout" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Update a workout. Can be used to finish a workout. 
*/
  workoutController.updateWorkout(req, res, next)
})

usersRouter.delete('/:id/workouts/:workoutId', (req: Request, res: Response, next: NextFunction) => {
  /*  
  #swagger.tags = ['Workouts']
  #swagger.responses[200] = { }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Delete a workout
*/
  workoutController.deleteWorkout(req, res, next)
})


usersRouter.get('/:id/workouts/:workoutId/exercises/:exerciseId', (req: Request, res: Response, next: NextFunction) => {
  /*  
  #swagger.tags = ['Workout Exercises']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/WorkoutExercise" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Get a exercise from a workout
*/
  workoutExerciseController.getWorkoutExerciseById(req, res, next)
})

usersRouter.get('/:id/workouts/:workoutId/exercises', (req: Request, res: Response, next: NextFunction) => {
  /*  
  #swagger.tags = ['Workout Exercises']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/WorkoutExercises" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Get all exercises from a workout
*/
  workoutExerciseController.getAllWorkoutExercises(req, res, next)
})

usersRouter.patch('/:id/workouts/:workoutId/exercises/:exerciseId', (
  req: Request, res: Response, next: NextFunction
) => {
  /*  
  #swagger.tags = ['Workout Exercises']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/UpdateWorkoutExercise" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/WorkoutExercise" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Partially update an exercise from a workout
*/
  workoutExerciseController.updateWorkoutExercise(req, res, next)
})