import { NextFunction, Request, Response } from 'express'
import { UserService } from '@application/services/UserService'
import { uuidValidator } from '@adapters/validators/UUIDValidator'
import { userWithPasswordValidator } from '@adapters/validators/UserValidator'
import { BadRequestError } from '@application/errors/BadRequestError'
import { NotFoundError } from '@application/errors/NotFoundError'
import { InternalServerError } from '@application/errors/InternalServerError'
import { ConflictError } from '@application/errors/ConflictError'

export class UserController {
  constructor(private userService: UserService) { }
    
  async getUser(req: Request, res: Response, next: NextFunction) {
    const params = req.params
    const validatorResult = await uuidValidator(params.id)
    if (validatorResult.error) {
      return next(new BadRequestError(validatorResult.error.message))
    }
    try {
      const user = await this.userService.getUser(validatorResult.data)
      if (user) {
        return res.status(200).send(user)
      }
      return next(new NotFoundError('User not found'))
    } catch {
      return next(new InternalServerError())
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers()
      return res.status(200).send(users)
    } catch {
      return next(new InternalServerError())
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const validatorResult = await userWithPasswordValidator(req.body)
    if (validatorResult.error) {
      return next(new BadRequestError(validatorResult?.error?.message))
    }
    try {
      const exists = await this.userService.getUserByName(validatorResult.data.username)
      if (exists) {
        return next(new ConflictError(
          `Conflict: A user with the username "${validatorResult.data.username} already exists."`
        ))
      }
      const user = await this.userService.createUser(validatorResult.data)
      return res.status(200).send(user)
    } catch {
      return next(new InternalServerError())
    } 
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateUser(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.')
  }

  async  deleteUser(req: Request, res: Response, next: NextFunction) {
    const params = req.params
    const validatorResult = await uuidValidator(params.id)
    if (validatorResult.error) {
      return next(new BadRequestError(validatorResult?.error?.message))
    }
    try {
      await this.userService.deleteUser(validatorResult.data)
      return res.status(200).send({ message: 'User deleted' })
    } catch {
      return next(new InternalServerError())
    }
  }
}