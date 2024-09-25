import { ExerciseController } from '@adapters/controllers/ExerciseController'
import { ExerciseService } from '@application/services/ExerciseService'
import { ExercisesRepositoryImpl } from '@infrastructure/repositories/ExercisesRepositoryImpl'
import express from 'express'

export const exercisesRouter = express.Router()

const exerciseRepository = new ExercisesRepositoryImpl()
const exerciseService = new ExerciseService(exerciseRepository)
const exerciseController = new ExerciseController(exerciseService)

exercisesRouter.get('/:id', exerciseController.getExercise.bind(exerciseController))
exercisesRouter.get('/', exerciseController.getAllExercises.bind(exerciseController))
exercisesRouter.post('/', exerciseController.createExercise.bind(exerciseController))

