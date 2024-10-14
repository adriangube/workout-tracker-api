import { WorkoutService } from '@application/services/WorkoutService'
import { NextFunction, Request, Response } from 'express'
import { uuidValidator } from '@adapters/validators/UUIDValidator'
import { BadRequestError, NotFoundError } from '@application/errors'
import { completeWorkoutValidator } from '@adapters/validators/WorkoutValidator'
import { UpdateWorkoutData } from '@domain/entities/workout'

export class WorkoutController {
  constructor(
    private workoutService: WorkoutService
  ) { }
  
  async getWorkoutById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      if (req.session?.user?.id !== params.id) {
        throw new NotFoundError('Workout not found')
      }
      const validatorResult = await uuidValidator(params.workoutId)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      const workout = this.workoutService.getWorkoutById(validatorResult.data)
      if (workout) {
        return res.status(200).send(workout)
      }
      throw new NotFoundError('Workout not found')
    } catch (e) {
      next(e)
    }
  }

  async getAllWorkoutsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      if (req.session?.user?.id !== params.id) {
        throw new NotFoundError('Workouts not found')
      }
      const validatorResult = await uuidValidator(params.id)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }

      const workouts = await this.workoutService.getAllWorkoutsByUserId(validatorResult.data)
      if (workouts.length > 0) {
        return res.status(200).send(workouts)
      }
      throw new NotFoundError('Workouts not found')

    } catch (e) {
      next(e)
    }
  }

  async startWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      if (req.session?.user?.id !== params.id) {
        throw new NotFoundError('Workout not found')
      }
      const body = req.body
      const validatorResult1 = await uuidValidator(body.userId)
      const validatorResult2 = await uuidValidator(body.templateId)
      if (validatorResult1.error) {
        throw new BadRequestError(validatorResult1?.error?.message)
      }
      if (validatorResult2.error) {
        throw new BadRequestError(validatorResult2?.error?.message)
      }

      const startedWorkout = await this.workoutService.startWorkout(validatorResult1.data, validatorResult2.data)
      return res.status(200).send(startedWorkout)
    } catch (e) {
      next(e)
    }
  }

  async updateWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      if (req.session?.user?.id !== params.id) {
        throw new NotFoundError('Workout not found')
      }
      const validatorResultWorkoutId = await uuidValidator(params.workoutId)
      if (validatorResultWorkoutId.error) {
        throw new BadRequestError(validatorResultWorkoutId?.error?.message)
      }
      const body = req.body
      const validatorResult = await completeWorkoutValidator(body)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      const data: UpdateWorkoutData = {
        ...validatorResult.data,
        workout_id: params.workoutId
      }
      const workout = await this.workoutService.updateWorkout(data)
      res.status(200).send(workout)
    } catch (e) {
      next(e)
    }
  }

  async deleteWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      if (req.session?.user?.id !== params.id) {
        throw new NotFoundError('Workout not found')
      }
      const validatorResultWorkoutId = await uuidValidator(params.workoutId)
      if (validatorResultWorkoutId.error) {
        throw new BadRequestError(validatorResultWorkoutId?.error?.message)
      }
      await this.workoutService.deleteWorkout(validatorResultWorkoutId.data)
    } catch (e) {
      next(e)
    }
  }
}