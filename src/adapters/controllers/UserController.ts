import { NextFunction, Request, Response } from 'express'
import { UserService } from '@application/services/UserService'
import { uuidValidator } from '@adapters/validators/UUIDValidator'
import { userWithPasswordValidator } from '@adapters/validators/UserValidator'
import { BadRequestError } from '@application/errors/BadRequestError'
import { NotFoundError } from '@application/errors/NotFoundError'
import { ConflictError } from '@application/errors/ConflictError'
import { AuthService } from '@application/services/AuthService'
import { UnauthorizedError } from '@application/errors'

export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }
    
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      const validatorResult = await uuidValidator(params.id)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult.error.message)
      }
      const user = await this.userService.getUser(validatorResult.data)
      if (user) {
        return res.status(200).send(user)
      }
      throw new NotFoundError('User not found')
    } catch(e) {
      next(e)
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const isAdminUser = await this.authService.isAdminUser(
        req.session?.user?.id as string,
        req.session?.user?.userName as string
      )
      if (!isAdminUser) {
        throw new UnauthorizedError()
      }
      const users = await this.userService.getAllUsers()
      return res.status(200).send(users)
    } catch(e) {
      next(e)
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const validatorResult = await userWithPasswordValidator(req.body)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      const exists = await this.userService.getUserByName(validatorResult.data.username)
      if (exists) {
        throw new ConflictError(
          `Conflict: A user with the username "${validatorResult.data.username} already exists."`
        )
      }
      const user = await this.userService.createUser(validatorResult.data)
      return res.status(200).send(user)
    } catch(e) {
      next(e)
    } 
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateUser(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.')
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const isAdminUser = await this.authService.isAdminUser(
        req.session?.user?.id as string,
        req.session?.user?.userName as string
      )
      if (!isAdminUser) {
        throw new UnauthorizedError()
      }
      const params = req.params
      const validatorResult = await uuidValidator(params.id)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      await this.userService.deleteUser(validatorResult.data)
      return res.status(200).send({ message: 'User deleted' })
    } catch(e) {
      next(e)
    }
  }
}