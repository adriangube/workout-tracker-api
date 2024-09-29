import express from 'express'
import { UserRepositoryImpl } from '@infrastructure/repositories/UserRepositoryImpl'
import { UserService } from '@application/services/UserService'
import { UserController } from '@adapters/controllers/UserController'

export const usersRouter = express.Router() 

const userRepository = new UserRepositoryImpl()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

usersRouter.get('/:id', (res, req) => {
  /*  
  #swagger.tags = ['Users']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/User" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  userController.getUser(res, req)
})

usersRouter.get('/', (req, res) => {
/*  
  #swagger.tags = ['Users']
  #swagger.responses[200] = { schema:{ "type": "array", $ref: "#/definitions/Users" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  userController.getAllUsers(req, res)
})

usersRouter.post('/', (req, res) => {
/*  
  #swagger.tags = ['Users']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/UserCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/User" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  userController.createUser(req, res)
})

usersRouter.patch('/:id', (req, res) => {
/*  
  #swagger.tags = ['Users']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/UserCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/User" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  userController.updateUser(req, res)
})

usersRouter.delete('/:id', (req, res) => {
/*  
  #swagger.tags = ['Users']
  #swagger.responses[200] = { }
  #swagger.security = [{"bearerAuth": []}]
*/
  userController.deleteUser(req, res)
})
