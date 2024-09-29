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
  #swagger.responses[200] = {
      description: "Get user by id",
      schema:{ $ref: "#/definitions/User" }
  } 
*/
  userController.getUser(res, req)
})

usersRouter.get('/', (req, res) => {
/*  
  #swagger.tags = ['Users']
  #swagger.responses[200] = {
      description: "Get user list",
      schema:{ "type": "array", $ref: "#/definitions/Users" }
  } 
*/
  userController.getAllUsers(req, res)
})

usersRouter.post('/', (req, res) => {
/*  
  #swagger.tags = ['Users']
  #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/UserCreationBody" }
    }
  #swagger.responses[200] = {
      description: "Create user",
      schema:{ $ref: "#/definitions/User" }
  } 
*/
  userController.createUser(req, res)
})

usersRouter.patch('/:id', (req, res) => {
/*  
  #swagger.tags = ['Users']
  #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/UserCreationBody" }
    }
    
  #swagger.responses[200] = {
      description: "Partially update a user",
      schema:{ $ref: "#/definitions/User" }
  } 
*/
  userController.updateUser(req, res)
})

usersRouter.delete('/:id', (req, res) => {
/*  
  #swagger.tags = ['Users']    
  #swagger.responses[200] = {
      description: "Delete a user"
  } 
*/
  userController.deleteUser(req, res)
})
