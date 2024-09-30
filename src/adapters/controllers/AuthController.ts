import { NextFunction, Request, Response } from 'express'
import { AuthService } from '@application/services/AuthService'
import { UserService } from '@application/services/UserService'
import { loginValidator } from '@adapters/validators/AuthValidator'
import { isPasswordValid } from '@utils/password'
import { UserWithPassword } from '@domain/entities/user'
import { BadRequestError } from '@application/errors/BadRequestError'
import { NotFoundError } from '@application/errors/NotFoundError'
import { UnauthorizedError } from '@application/errors/UnauthorizedError'

export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }
  
  async login(req: Request, res: Response, next: NextFunction) {
    
    try {
      const validatorResult = await loginValidator(req.body)
      if (validatorResult.error) {
        throw new BadRequestError(validatorResult?.error?.message)
      }
      const user = await this.userService.getUserByName(validatorResult.data.username, true)
      if (!user) {
        throw new NotFoundError('User not found')
      }
      const isValid = isPasswordValid(validatorResult.data.password, (user as UserWithPassword).password)
      if (!isValid) {
        throw new UnauthorizedError('Invalid credentials. Please check your username and password.')
      }
      const token = await this.authService.createToken(user.id as string, user.username)
      return res.status(200).send({ token })
    }catch(e){
      next(e)
    }
  }
}