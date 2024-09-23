import { Request, Response } from 'express'
import { ExerciseService } from '@application/services/ExerciseService'
import { uuidValidator } from '@adapters/validators/UUIDValidator'
import { exerciseValidator } from '@adapters/validators/ExerciseValidator'

export class ExerciseController {
  constructor(private exerciseService: ExerciseService) { }
  
  async getExercise(req: Request, res: Response) {
    const params = req.params
    const validatorResult = await uuidValidator(params.id)
    if (validatorResult.error) {
      return res.status(400).send(validatorResult.error)
    }
    try {
      const exercise = await this.exerciseService.getExercise(validatorResult.data)
      if (exercise) {
        return res.status(200).send(exercise)
      }
      return res.status(404).send({ message: 'Exercise not found' })
    } catch (e) {
      console.error(e)
      return res.status(500).send({ message: 'Internal server error' })
    }
  }

  async getAllExercises(req: Request, res: Response) {
    try {
      const exercises = await this.exerciseService.getAllExercises()
      return res.status(200).send(exercises)
    } catch (e) {
      console.error(e)
      return res.status(500).send({ message: ' Internal server error' })
    }
  }

  async createExercise(req: Request, res: Response) {
    const validatorResult = await exerciseValidator(req.body)
    if (validatorResult.error) {
      return res.status(400).send(validatorResult.error)
    }

    try {
      const exercise = await this.exerciseService.createExercise(validatorResult.data)
      res.status(200).send(exercise)
      
    } catch (e) {
      console.error(e)
      return res.status(500).send({ message: 'Internal server error' })
    }
  }
}