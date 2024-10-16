import { WorkoutTemplateExerciseService } from '@/workoutTemplateExercises/application/WorkoutTemplateExerciseService'
import { uuidValidator } from '@/app/infrastructure/validators/UUIDValidator'
import { BadRequestError, NotFoundError, UnauthorizedError } from '@/app/application/errors'
import { NextFunction, Request, Response } from 'express'
import {
  createWorkoutTemplateExerciseValidator
} from '@/workoutTemplateExercises/infrastructure/WorkoutTemplateExerciseValidator'


export class WorkoutTemplateExerciseController {
  constructor(
    private workoutTemplateExerciseService: WorkoutTemplateExerciseService
  ) { }
  
  async getAllWorkoutTemplateExerciseByWorkoutTemplateId(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params

      if (req.session?.user?.id !== params.id) {
        throw new NotFoundError('Workout template exercises not found')
      }
      const validatorResult = await uuidValidator(params.templateId)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }

      const workoutTemplateExercises = await this.workoutTemplateExerciseService.
        getAllWorkoutTemplateExerciseByWorkoutTemplateId(validatorResult.data)
      
      if (workoutTemplateExercises.length > 0) {
        return res.status(200).send(workoutTemplateExercises)
      }
      throw new NotFoundError('Workout template exercises not found')

    } catch (e) {
      next(e)
    }
  }

  async getWorkoutTemplateExerciseById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params

      if (req.session?.user?.id !== params.id) {
        throw new NotFoundError('Workout template exercise not found')
      }

      const validatorResult = await uuidValidator(params.templateExerciseId)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }

      const workoutTemplateExercise = await this.workoutTemplateExerciseService.
        getWorkoutTemplateExerciseById(validatorResult.data)
      
      if (!workoutTemplateExercise) {
        throw new NotFoundError('Workout template exercises not found')
      }
      return res.status(200).send(workoutTemplateExercise)

    } catch (e) {
      next(e)
    }
  }

  async createWorkoutTemplateExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params

      if (req.session?.user?.id !== params.id) {
        throw new UnauthorizedError()
      }

      const validatorResult = await createWorkoutTemplateExerciseValidator(req.body)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }

      const workoutTemplateExercise =
        await this.workoutTemplateExerciseService.createWorkoutTemplateExercise(validatorResult.data)
      
      return res.status(200).send(workoutTemplateExercise)

    } catch (e) {
      next(e)
    }
  }

  async deleteWorkoutTemplateExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params

      if (req.session?.user?.id !== params.id) {
        throw new UnauthorizedError()
      }

      const validatorResult = await uuidValidator(params.templateExerciseId)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      await this.workoutTemplateExerciseService.deleteWorkoutTemplateExercise(validatorResult.data)
    } catch (e) {
      next(e)
    }
  }

}