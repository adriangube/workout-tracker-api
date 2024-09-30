import { NextFunction, Request, Response } from 'express'
import { AuthService } from '@application/services/AuthService'
import { UserService } from '@application/services/UserService'
import { loginValidator } from '@adapters/validators/AuthValidator'
import { isPasswordValid } from '@utils/password'
import { UserWithPassword } from '@domain/entities/user'
import { BadRequestError } from '@application/errors/BadRequestError'
import { NotFoundError } from '@application/errors/NotFoundError'
import { UnauthorizedError } from '@application/errors/UnauthorizedError'
import { InternalServerError } from '@application/errors/InternalServerError'

export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }
  
  async login(req: Request, res: Response, next: NextFunction) {
    const validatorResult = await loginValidator(req.body)
    if (validatorResult.error) {
      return next(new BadRequestError(validatorResult?.error?.message))
    }
    try {
      const user = await this.userService.getUserByName(validatorResult.data.username, true)
      if (!user) {
        return next(new NotFoundError('User not found'))
      }
      try {
        const isValid = isPasswordValid(validatorResult.data.password, (user as UserWithPassword).password)
        if (!isValid) {
          return next(new UnauthorizedError('Invalid credentials. Please check your username and password.'))
        }
      } catch {
        return next(new InternalServerError('Error decoding the password'))
      }
      try {
        const token = await this.authService.createToken(user.id as string, user.username)
        return res.status(200).send({ token })
      } catch { 
        return next(new InternalServerError('Error generating token'))
      }
    }catch{
      return next(new InternalServerError())
    }
  }
}