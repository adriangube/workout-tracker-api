import jwt, { Secret } from 'jsonwebtoken'
import { config } from '@config/index'
import { InternalServerError } from '@application/errors'
import { UserRepository } from '@domain/repositories/UserRepository'


export class AuthService { 

  constructor(
    private userRepository: UserRepository
  ){}

  createToken(id: string, userName: string): string {
    try {
      const params = { id, userName }
      const options = {
        expiresIn: '1h'
      }
      const token = jwt.sign(
        params,
      config.SECRET as Secret,
      options
      )
      return token
    } catch {
      throw new InternalServerError('Error generating token')
    }
  }

  async isAdminUser(id: string, userName: string): Promise<boolean> {
    const adminUser = await this.userRepository.getByName(config.ADMIN_USERNAME as string)
    return adminUser?.id === id && adminUser.username === userName
  }
  
}