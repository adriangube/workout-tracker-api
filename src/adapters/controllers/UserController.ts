import { Request, Response } from 'express'
import { UserService } from '@application/services/UserService'
import { uuidValidator } from '@adapters/validators/UUIDValidator'
import { userWithPasswordValidator } from '@adapters/validators/UserValidator'

export class UserController {
  constructor(private userService: UserService) { }
    
  async getUser(req: Request, res: Response) {
    const params = req.params
    const validatorResult = await uuidValidator(params.id)
    if (validatorResult.error) {
      return res.status(400).send(validatorResult.error)
    }
    try {
      const user = await this.userService.getUser(validatorResult.data)
      if (user) {
        return res.status(200).send(user)
      }
      return res.status(404).send({ message: 'User not found' })
    } catch (e) {
      console.error(e)
      return res.status(500).send({ message: 'Internal server error' })
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers()
      return res.status(200).send(users)
    } catch (e) {
      console.error(e)
      return res.status(500).send({ message: 'Internal server error' })
    }
  }

  async createUser(req: Request, res: Response) {
    const validatorResult = await userWithPasswordValidator(req.body)
    if(validatorResult.error) {
      return res.status(400).send(validatorResult.error)
    }
    try {
      const user = await this.userService.createUser(validatorResult.data)
      return res.status(200).send(user)
    } catch (e) {
      console.error(e)
      return res.status(500).send({ message: 'Internal server error' })
    } 
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateUser(req: Request, res: Response) {
    throw new Error('Method not implemented.')
  }

  async  deleteUser(req: Request, res: Response) {
    const params = req.params
    const validatorResult = await uuidValidator(params.id)
    if (validatorResult.error) {
      return res.status(400).send(validatorResult.error)
    }
    try {
      await this.userService.deleteUser(validatorResult.data)
      return res.status(200).send({ message: 'User deleted' })
    } catch (e) {
      console.error(e)
      return res.status(500).send({ message: 'Internal server error' })
    }
  }
}