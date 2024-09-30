import { NextFunction, Request, Response } from 'express'
import { MuscleGroupService } from '@application/services/MuscleGroupService'
import { muscleGroupValidator } from '@adapters/validators/MuscleGroupValidator'
import { uuidValidator } from '@adapters/validators/UUIDValidator'
import { BadRequestError } from '@application/errors/BadRequestError'
import { NotFoundError } from '@application/errors/NotFoundError'
import { InternalServerError } from '@application/errors/InternalServerError'

export class MuscleGroupController {
  constructor(private muscleGroupService: MuscleGroupService) { }

  async getMuscleGroup(req: Request, res: Response, next: NextFunction) { 
    const params = req.params
    const validatorResult = await uuidValidator(params.id)
    if (validatorResult.error) {
      return next(new BadRequestError(validatorResult?.error?.message))
    }
    try {
      const muscleGroup = await this.muscleGroupService.getMuscleGroup(validatorResult.data)
      if (muscleGroup) {
        return res.status(200).send(muscleGroup)
      }
      return next(new NotFoundError('Muscle group not found'))
    } catch {
      return next(new InternalServerError())
    }
  }

  async getAllMuscleGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const muscleGroups = await this.muscleGroupService.getAllMuscleGroups()
      return res.status(200).send(muscleGroups)
    } catch {
      return next(new InternalServerError())
    }
  }

  async createMuscleGroup(req: Request, res: Response, next: NextFunction) {
    const validatorResult = await muscleGroupValidator(req.body)
    if (validatorResult.error) {
      return next(new BadRequestError(validatorResult?.error?.message))
    }
    try {
      const muscleGroup = await this.muscleGroupService.createMuscleGroup(validatorResult.data)
      return res.status(200).send(muscleGroup)
    } catch {
      return next(new InternalServerError())
    } 
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateMuscleGroup(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.')
  }

  async deleteMuscleGroup(req: Request, res: Response, next: NextFunction) {
    const params = req.params
    const validatorResult = await uuidValidator(params.id)
    if (validatorResult.error) {
      return next(new BadRequestError(validatorResult?.error?.message))
    }
    try {
      await this.muscleGroupService.deleteMuscleGroup(validatorResult.data)
      return res.status(200).send({ message: 'Muscle group deleted' })
    } catch {
      return next(new InternalServerError())
    }
  }
}