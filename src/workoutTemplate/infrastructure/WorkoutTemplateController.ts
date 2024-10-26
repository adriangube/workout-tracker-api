import { uuidValidator } from '@/app/infrastructure/validators/UUIDValidator'
import { createWorkoutTemplateValidator } from '@/workoutTemplate/infrastructure/WorkoutTemplateValidator'
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '@/app/application/errors'
import { WorkoutTemplateService } from '@/workoutTemplate/application/WorkoutTemplateService'
import { NextFunction, Request, Response } from 'express'

export class WorkoutTemplateController {
  constructor(
    private workoutTemplateService: WorkoutTemplateService
  ) { }
  
  async getWorkoutTemplatesById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      const validatorResult = await uuidValidator(params.templateId)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      const workoutTemplate = await this.workoutTemplateService.getWorkoutTemplatesById(validatorResult.data)
      if (workoutTemplate) {
        return res.status(200).send(workoutTemplate)
      }
      throw new NotFoundError('Workout template not found')
    } catch (e) {
      next(e)
    }
  }

  async getAllWorkoutTemplatesByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params

      // This prevents other users from requesting the workout templates from other users
      if (req.session?.user?.id !== params.id) {
        throw new NotFoundError('Workout templates not found')
      }
      const validatorResult = await uuidValidator(params.id)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      const workoutTemplates = await this.workoutTemplateService.getWorkoutAllTemplatesByUserId(validatorResult.data)
      if (workoutTemplates?.length > 0) {
        return res.status(200).send(workoutTemplates)
      }
      throw new NotFoundError('Workout templates not found')
    } catch (e) {
      next(e)
    }
  }

  async createWorkoutTemplate(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      if (req.session?.user?.id !== params.id) {
        throw new UnauthorizedError()
      }
      const validatorResult = await createWorkoutTemplateValidator(req.body)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      const usersTemplates = await this.workoutTemplateService.
        getWorkoutAllTemplatesByUserId(validatorResult.data.user_id)
      const withSameName = usersTemplates?.filter((template) => template.name === validatorResult.data.name)
      if (withSameName?.length > 0) {
        throw new ConflictError('Conflict: A workout template already exist with the same name')
      }

      const workoutTemplate = await this.workoutTemplateService.createWorkoutTemplate(validatorResult.data)
      res.status(200).send(workoutTemplate)

    } catch (e) {
      next(e)
    }
  }

  async deleteWorkoutTemplate(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      if (req.session?.user?.id !== params.id) {
        throw new UnauthorizedError()
      }
      const validatorResult = await uuidValidator(params.id)
      const validatorResult2 = await uuidValidator(params.templateId)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      if (validatorResult2.error) {
        throw new BadRequestError(validatorResult2?.error?.message)
      }
      await this.workoutTemplateService.deleteWorkoutTemplate(params.id, params.templateId)
    } catch (e) {
      next(e)
    }
  }
}