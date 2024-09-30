import express, { NextFunction, Request, Response }  from 'express'
import { UserRepositoryImpl } from '@infrastructure/repositories/UserRepositoryImpl'
import { UserService } from '@application/services/UserService'
import { UserController } from '@adapters/controllers/UserController'

export const usersRouter = express.Router() 

const userRepository = new UserRepositoryImpl()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

usersRouter.get('/:id', (res: Request, req: Response, next: NextFunction) => {
  /*  
  #swagger.tags = ['Users']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/User" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  userController.getUser(res, req, next)
})

usersRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Users']
  #swagger.responses[200] = { schema:{ "type": "array", $ref: "#/definitions/Users" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  userController.getAllUsers(req, res, next)
})

usersRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Users']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/UserCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/User" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  userController.createUser(req, res, next)
})

usersRouter.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Users']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/UserCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/User" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  userController.updateUser(req, res, next)
})

usersRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Users']
  #swagger.responses[200] = { }
  #swagger.security = [{"bearerAuth": []}]
*/
  userController.deleteUser(req, res, next)
})
