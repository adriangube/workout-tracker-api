import { Request, Response } from 'express'
import { MuscleGroupService } from '@application/services/MuscleGroupService'
import { muscleGroupValidator } from '@adapters/validators/MuscleGroupValidator'
import { uuidValidator } from '@adapters/validators/UUIDValidator'

export class MuscleGroupController {
  constructor(private muscleGroupService: MuscleGroupService) { }

  async getMuscleGroup(req: Request, res: Response) { 
    const params = req.params
    const validatorResult = await uuidValidator(params.id)
    if (validatorResult.error) {
      return res.status(400).send(validatorResult.error)
    }
    try {
      const muscleGroup = await this.muscleGroupService.getMuscleGroup(validatorResult.data)
      if (muscleGroup) {
        return res.status(200).send(muscleGroup)
      }
      return res.status(404).send({ message: 'Muscle group not found' })
    } catch (e) {
      console.error(e)
      return res.status(500).send({ message: 'Internal server error' })
    }
  }

  async getAllMuscleGroups(req: Request, res: Response) {
    try {
      const muscleGroups = await this.muscleGroupService.getAllMuscleGroups()
      return res.status(200).send(muscleGroups)
    } catch (e) {
      console.error(e)
      return res.status(500).send({ message: 'Internal server error' })
    }
  }

  async createMuscleGroup(req: Request, res: Response) {
    const validatorResult = await muscleGroupValidator(req.body)
    if(validatorResult.error) {
      return res.status(400).send(validatorResult.error)
    }
    try {
      const muscleGroup = await this.muscleGroupService.createMuscleGroup(validatorResult.data)
      return res.status(200).send(muscleGroup)
    } catch (e) {
      console.error(e)
      return res.status(500).send({ message: 'Internal server error' })
    } 
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateMuscleGroup(req: Request, res: Response) {
    throw new Error('Method not implemented.')
  }

  async deleteMuscleGroup(req: Request, res: Response) {
    const params = req.params
    const validatorResult = await uuidValidator(params.id)
    if (validatorResult.error) {
      return res.status(400).send(validatorResult.error)
    }
    try {
      await this.muscleGroupService.deleteMuscleGroup(validatorResult.data)
      return res.status(200).send({ message: 'Muscle group deleted' })
    } catch (e) {
      console.error(e)
    }
  }
}