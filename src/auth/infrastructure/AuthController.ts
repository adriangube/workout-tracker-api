import { NextFunction, Request, Response } from 'express'
import { AuthService } from '@/auth/application/AuthService'
import { UserService } from '@/user/application/UserService'
import { tokenValidator } from '@/auth/infrastructure/AuthValidator'
import { isPasswordValid } from '@/auth/utils/password'
import { UserWithPassword } from '@/user/domain/user'
import { BadRequestError } from '@/app/application/errors/BadRequestError'
import { NotFoundError } from '@/app/application/errors/NotFoundError'
import { UnauthorizedError } from '@/app/application/errors/UnauthorizedError'

export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }
  
  async token(req: Request, res: Response, next: NextFunction) {
    
    try {
      const validatorResult = await tokenValidator(req.body)
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