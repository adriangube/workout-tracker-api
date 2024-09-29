import { Request, Response } from 'express'
import { AuthService } from '@application/services/AuthService'
import { UserService } from '@application/services/UserService'
import { loginValidator } from '@adapters/validators/AuthValidator'
import { isPasswordValid } from '@utils/password'
import { UserWithPassword } from '@domain/entities/user'
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }
  
  async login(req: Request, res: Response) {
    const validatorResult = await loginValidator(req.body)
    if (validatorResult.error) {
      return res.status(400).send(validatorResult.error)
    }
    try {
      const user = await this.userService.getUserByName(validatorResult.data.username, true)
      if (!user) {
        return res.status(404).send({ message: 'User not found' })
      }
      try {
        const isValid = isPasswordValid(validatorResult.data.password, (user as UserWithPassword).password)
        if (!isValid) {
          return res.status(401).send({ message: 'Invalid credentials. Please check your username and password.' })
        }
      } catch (e) {
        console.error(e)
        return res.status(500).send({ message: 'Error decoding password' })
      }
      try {
        const token = await this.authService.createToken(user.id as string, user.username)
        return res.status(200).send({ token })
      } catch (e) { 
        console.error(e)
        return res.status(500).send({ message: 'Error generating token' })
      }
    }catch(e){
      console.error(e)
      return res.status(500).send({ message: 'Internal server error' })
    }
  }
}