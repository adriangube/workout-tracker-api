import express from "express";
import { UserRepositoryImpl } from "@infrastructure/repositories/UserRepositoryImpl";
import { UserService } from '@application/services/UserService'
import { UserController } from '@adapters/controllers/UserController';

export const usersRouter = express.Router();

const userRepository = new UserRepositoryImpl()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

usersRouter.get('/:id',userController.getUser.bind(userController))

usersRouter.get('/', userController.getAllUsers.bind(userController));

usersRouter.post('/', userController.createUser.bind(userController));

usersRouter.patch('/:id', userController.updateUser.bind(userController));

usersRouter.delete('/:id', userController.deleteUser.bind(userController));
