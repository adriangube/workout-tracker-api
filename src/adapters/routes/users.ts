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
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/user"
              },
              example: {
                id: '1',
                name: 'username',
                email: 'email@gmail.com'
              }
          }           
      }
  } 
*/
  userController.getUser(res, req)
})

usersRouter.get('/', (req, res) => {
/*  
  #swagger.tags = ['Users']
  #swagger.responses[200] = {
      description: "Get user list",
      content: {
          "application/json": {
              schema:{
                "type": "array",
                $ref: "#/components/schemas/user"
              },
              example: [
                {
                  id: '1',
                  name: 'username',
                  email: 'email@gmail.com'
                }
              ]
          }           
      }
  } 
*/
  userController.getAllUsers(req, res)
})

usersRouter.post('/', (req, res) => {
/*  
  #swagger.tags = ['Users']
  #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/user"
                },
                example: {
                  name: 'username',
                  email: 'email@gmail.com',
                  password: 'password'
                }
            }
        }
    }
  #swagger.responses[200] = {
      description: "Create user",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/user"
              },
              example: {
                id: '1',
                name: 'username',
                email: 'email@gmail.com'
              }
          }           
      }
  } 
*/
  userController.createUser(req, res)
})

usersRouter.patch('/:id', (req, res) => {
/*  
  #swagger.tags = ['Users']
  #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/user"
                },
                example: {
                  name: 'username',
                  email: 'email@gmail.com',
                  password: 'password'
                }
            }
        }
    }
    
  #swagger.responses[200] = {
      description: "Partially update a user",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/user"
              },
              example: {
                id: '1',
                name: 'username',
                email: 'email@gmail.com'
              }
          }           
      }
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
