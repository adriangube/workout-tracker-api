import { ExerciseController } from '@adapters/controllers/ExerciseController'
import { ExerciseService } from '@application/services/ExerciseService'
import { ExercisesRepositoryImpl } from '@infrastructure/repositories/ExercisesRepositoryImpl'
import express from 'express'

export const exercisesRouter = express.Router()

const exerciseRepository = new ExercisesRepositoryImpl()
const exerciseService = new ExerciseService(exerciseRepository)
const exerciseController = new ExerciseController(exerciseService)

exercisesRouter.get('/:id', (req, res) => {
  // #swagger.tags = ['Exercises']
  exerciseController.getExercise(req, res)
})
exercisesRouter.get('/', (req, res) => {
  // #swagger.tags = ['Exercises']
  exerciseController.getAllExercises(req, res)
})
exercisesRouter.post('/', (req, res) => {
  // #swagger.tags = ['Exercises']
  exerciseController.createExercise(req, res)
})

