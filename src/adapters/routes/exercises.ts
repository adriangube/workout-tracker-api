import express, { NextFunction, Request, Response } from 'express'
import { ExerciseController } from '@adapters/controllers/ExerciseController'
import { ExerciseService } from '@application/services/ExerciseService'
import { ExercisesRepositoryImpl } from '@infrastructure/repositories/ExercisesRepositoryImpl'

export const exercisesRouter = express.Router()

const exerciseRepository = new ExercisesRepositoryImpl()
const exerciseService = new ExerciseService(exerciseRepository)
const exerciseController = new ExerciseController(exerciseService)

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
  #swagger.tags = ['Exercises']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/ExerciseCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/Exercise" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  exerciseController.createExercise(req, res, next)
})

