import jwt, { Secret } from 'jsonwebtoken'
import { config } from '@config/index'


export class AuthService { 

  createToken(id: string, userName: string): string {
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
  }
}