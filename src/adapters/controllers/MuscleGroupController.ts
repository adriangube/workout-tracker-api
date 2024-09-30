import { NextFunction, Request, Response } from 'express'
import { MuscleGroupService } from '@application/services/MuscleGroupService'
import { muscleGroupValidator } from '@adapters/validators/MuscleGroupValidator'
import { uuidValidator } from '@adapters/validators/UUIDValidator'
import { BadRequestError } from '@application/errors/BadRequestError'
import { NotFoundError } from '@application/errors/NotFoundError'
import { ConflictError } from '@application/errors/ConflictError'

export class MuscleGroupController {
  constructor(private muscleGroupService: MuscleGroupService) { }

  async getMuscleGroup(req: Request, res: Response, next: NextFunction) { 
    try {
      const params = req.params
      const validatorResult = await uuidValidator(params.id)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      const muscleGroup = await this.muscleGroupService.getMuscleGroup(validatorResult.data)
      if (muscleGroup) {
        return res.status(200).send(muscleGroup)
      }
      throw new NotFoundError('Muscle group not found')
    } catch(e) {
      next(e)
    }
  }

  async getAllMuscleGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const muscleGroups = await this.muscleGroupService.getAllMuscleGroups()
      return res.status(200).send(muscleGroups)
    } catch(e) {
      next(e)
    }
  }

  async createMuscleGroup(req: Request, res: Response, next: NextFunction) {
 
    try {
      const validatorResult = await muscleGroupValidator(req.body)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      const exists = await this.muscleGroupService.getMuscleGroupByName(validatorResult.data.name)
      if (exists) {
        throw new ConflictError(
          `Conflict: A muscle group with the name "${validatorResult.data.name}" already exists.`
        )
      }
      const muscleGroup = await this.muscleGroupService.createMuscleGroup(validatorResult.data)
      return res.status(200).send(muscleGroup)
    } catch(e) {
      next(e)
    } 
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateMuscleGroup(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.')
  }

  async deleteMuscleGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      const validatorResult = await uuidValidator(params.id)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }      
      await this.muscleGroupService.deleteMuscleGroup(validatorResult.data)
      return res.status(200).send({ message: 'Muscle group deleted' })
    } catch(e) {
      next(e)
    }
  }
}