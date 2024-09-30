import express, { NextFunction, Request, Response } from 'express'
import { UserService } from '@application/services/UserService'
import { UserRepositoryImpl } from '@infrastructure/repositories/UserRepositoryImpl'
import { AuthService } from '@application/services/AuthService'
import { AuthController } from '@adapters/controllers/AuthController'

export const authRouter = express.Router() 

const userRepository = new UserRepositoryImpl()
const userService = new UserService(userRepository)
const authService = new AuthService()
const authController = new AuthController(userService, authService)

authRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Auth']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/LoginBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/LoginResponse" } } 
*/
  authController.login(req, res, next)
})