import { WorkoutExerciseService } from '@/workoutExercise/application/WorkoutExerciseService'
import { NextFunction, Request, Response } from 'express'
import { BadRequestError, NotFoundError } from '@/app/application/errors'
import { uuidValidator } from '@/app/infrastructure/validators/UUIDValidator'
import { updateWorkoutExerciseValidator } from '@/workoutExercise/infrastructure/WorkoutExerciseValidator'

export class WorkoutExerciseController {
  constructor(
    private workoutExerciseService: WorkoutExerciseService
  ){}

  async getWorkoutExerciseById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      if (req.session?.user?.id !== params.id) {
        throw new NotFoundError('Workout exercise not found')
      }

      const validatorResult = await uuidValidator(params.exerciseId)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }

      const workoutExercise = await this.workoutExerciseService.getWorkoutExerciseById(validatorResult.data)
      if (workoutExercise) {
        return res.status(200).send(workoutExercise)
      }
      throw new NotFoundError('Workout exercise not found')
    } catch (e) {
      next(e)
    }
  }

  async getAllWorkoutExercises(req: Request, res: Response, next: NextFunction) {
    try {

      const params = req.params
      if (req.session?.user?.id !== params.id) {
        throw new NotFoundError('Workout exercise not found')
      }

      const validatorResult = await uuidValidator(params.workoutId)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }

      const workoutExercises = await this.workoutExerciseService.getAllWorkoutExercises(validatorResult.data)
      if (workoutExercises?.length > 0) {
        return res.status(200).send(workoutExercises)
      }
      throw new NotFoundError('Workout exercises not found')
    } catch (e) {
      next(e)
    }
  }

  async updateWorkoutExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      if (req.session?.user?.id !== params.id) {
        throw new NotFoundError('Workout exercise not found')
      }
      const body = req.body
      const validatorResult = await updateWorkoutExerciseValidator(body)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      const workoutExercise = await this.workoutExerciseService.updateWorkoutExercise(validatorResult.data)
      res.status(200).send(workoutExercise)
    } catch (e) {
      next(e)
    }
  }

}