import express from 'express'
import { UserRepositoryImpl } from '@infrastructure/repositories/UserRepositoryImpl'
import { UserService } from '@application/services/UserService'
import { UserController } from '@adapters/controllers/UserController'

export const usersRouter = express.Router()

const userRepository = new UserRepositoryImpl()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

usersRouter.get('/:id', (res, req) => {
  // #swagger.tags = ['Users']
  userController.getUser(res, req)
})

usersRouter.get('/', (req, res) => {
  // #swagger.tags = ['Users']
  userController.getAllUsers(req, res)
})

usersRouter.post('/', (req, res) => {
  // #swagger.tags = ['Users']
  userController.createUser(req, res)
})

usersRouter.patch('/:id', (req, res) => {
  // #swagger.tags = ['Users']
  userController.updateUser(req, res)
})

usersRouter.delete('/:id', (req, res) => {
  // #swagger.tags = ['Users']
  userController.deleteUser(req, res)
})
