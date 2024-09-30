import jwt, { Secret } from 'jsonwebtoken'
import { config } from '@config/index'
import { InternalServerError } from '@application/errors'


export class AuthService { 

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

  
}