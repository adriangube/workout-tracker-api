import { NextFunction, Request, Response } from 'express'
import { ExerciseService } from '@application/services/ExerciseService'
import { uuidValidator } from '@adapters/validators/UUIDValidator'
import { createExerciseValidator } from '@adapters/validators/ExerciseValidator'
import { BadRequestError } from '@application/errors/BadRequestError'
import { NotFoundError } from '@application/errors/NotFoundError'
import { ConflictError } from '@application/errors/ConflictError'
import { AuthService } from '@application/services/AuthService'
import { UnauthorizedError } from '@application/errors'

export class ExerciseController {
  constructor(
    private exerciseService: ExerciseService,
    private authService: AuthService
  ) { }

  async getExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      const validatorResult = await uuidValidator(params.id)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      const exercise = await this.exerciseService.getExercise(validatorResult.data)
      if (exercise) {
        return res.status(200).send(exercise)
      }
      throw new NotFoundError('Exercise not found')
    } catch(e) {
      next(e)
    }
  }

  async getAllExercises(req: Request, res: Response, next: NextFunction) {
    try {
      const exercises = await this.exerciseService.getAllExercises()
      return res.status(200).send(exercises)
    } catch(e) {
      next(e)
    }
  }

  async createExercise(req: Request, res: Response, next: NextFunction) {
    
    try {
      const isAdminUser = await this.authService.isAdminUser(
        req.session?.user?.id as string,
        req.session?.user?.userName as string
      )
      if (!isAdminUser) {
        throw new UnauthorizedError()
      }
      const validatorResult = await createExerciseValidator(req.body)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }

      const exists = await this.exerciseService.getExerciseByName(validatorResult.data.name)
      if (exists) {
        throw new ConflictError(`Conflict: A exercise with the name "${ validatorResult.data.name }" already exists.`)
      }
      const exercise = await this.exerciseService.createExercise(validatorResult.data)
      res.status(200).send(exercise)
      
    } catch(e) {
      next(e)
    }
  }
}