import express, { NextFunction, Request, Response } from 'express'
import { ExerciseController } from '@/exercise/infrastructure/ExerciseController'
import { ExerciseService } from '@/exercise/application/ExerciseService'
import { ExercisesRepositoryImpl } from '@/exercise/infrastructure/ExercisesRepositoryImpl'
import { AuthService } from '@/auth/application/AuthService'
import { UserRepositoryImpl } from '@/user/infrastructure/UserRepositoryImpl'

export const exercisesRouter = express.Router()

const exerciseRepository = new ExercisesRepositoryImpl()
const exerciseService = new ExerciseService(exerciseRepository)
const userRepository = new UserRepositoryImpl()
const authService = new AuthService(userRepository)
const exerciseController = new ExerciseController(exerciseService, authService)

exercisesRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Exercises']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/Exercise" } } 
  #swagger.security = [{"bearerAuth": []}]
*/
  exerciseController.getExercise(req, res, next)
})
exercisesRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Exercises']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/Exercises" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  exerciseController.getAllExercises(req, res, next)
})
exercisesRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Internal']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/ExerciseCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/Exercise" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  exerciseController.createExercise(req, res, next)
})

