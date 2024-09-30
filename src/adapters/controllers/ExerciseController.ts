import { NextFunction, Request, Response } from 'express'
import { ExerciseService } from '@application/services/ExerciseService'
import { uuidValidator } from '@adapters/validators/UUIDValidator'
import { createExerciseValidator } from '@adapters/validators/ExerciseValidator'
import { BadRequestError } from '@application/errors/BadRequestError'
import { NotFoundError } from '@application/errors/NotFoundError'
import { InternalServerError } from '@application/errors/InternalServerError'

export class ExerciseController {
  constructor(private exerciseService: ExerciseService) { }
  
  async getExercise(req: Request, res: Response, next: NextFunction) {
    const params = req.params
    const validatorResult = await uuidValidator(params.id)
    if (validatorResult.error) {
      return next(new BadRequestError(validatorResult?.error?.message))
    }
    try {
      const exercise = await this.exerciseService.getExercise(validatorResult.data)
      if (exercise) {
        return res.status(200).send(exercise)
      }
      return next(new NotFoundError('Exercise not found'))
    } catch {
      return next(new InternalServerError())
    }
  }

  async getAllExercises(req: Request, res: Response, next: NextFunction) {
    try {
      const exercises = await this.exerciseService.getAllExercises()
      return res.status(200).send(exercises)
    } catch {
      return next(new InternalServerError())
    }
  }

  async createExercise(req: Request, res: Response, next: NextFunction) {
    const validatorResult = await createExerciseValidator(req.body)
    if (validatorResult.error) {
      return next(new BadRequestError(validatorResult?.error?.message))
    }

    try {
      const exercise = await this.exerciseService.createExercise(validatorResult.data)
      res.status(200).send(exercise)
      
    } catch {
      return next(new InternalServerError())
    }
  }
}