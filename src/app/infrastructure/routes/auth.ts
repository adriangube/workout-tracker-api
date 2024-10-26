import express, { NextFunction, Request, Response } from 'express'
import { UserService } from '@/user/application/UserService'
import { UserRepositoryImpl } from '@/user/infrastructure/UserRepositoryImpl'
import { AuthService } from '@/auth/application/AuthService'
import { AuthController } from '@/auth/infrastructure/AuthController'

export const authRouter = express.Router() 

const userRepository = new UserRepositoryImpl()
const userService = new UserService(userRepository)
const authService = new AuthService(userRepository)
const authController = new AuthController(userService, authService)

authRouter.post('/token', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Auth']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/LoginBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/LoginResponse" } } 
  #swagger.description = Get an authentication token
*/
  authController.token(req, res, next)
})