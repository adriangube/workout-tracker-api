import express, { NextFunction, Request, Response }  from 'express'
import { UserRepositoryImpl } from '@infrastructure/repositories/UserRepositoryImpl'
import { UserService } from '@application/services/UserService'
import { UserController } from '@adapters/controllers/UserController'
import { AuthService } from '@application/services/AuthService'
import { WorkoutTemplateRepositoryImpl } from '@infrastructure/repositories/WorkoutTemplateRepositoryImpl'
import { WorkoutTemplateService } from '@application/services/WorkoutTemplateService'
import { WorkoutTemplateController } from '@adapters/controllers/WorkoutTemplateController'

export const usersRouter = express.Router() 

const userRepository = new UserRepositoryImpl()
const userService = new UserService(userRepository)
const authService = new AuthService(userRepository)
const userController = new UserController(userService, authService)

const workoutTemplateRepository = new WorkoutTemplateRepositoryImpl()
const workoutTemplateService = new WorkoutTemplateService(workoutTemplateRepository)
const workoutTemplateController = new WorkoutTemplateController(workoutTemplateService)

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
  #swagger.tags = ['Internal']
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
  #swagger.tags = ['Internal']
  #swagger.responses[200] = { }
  #swagger.security = [{"bearerAuth": []}]
*/
  userController.deleteUser(req, res, next)
})

usersRouter.get('/:id/workout-templates', (req: Request, res: Response, next: NextFunction) => {
  /*  
  #swagger.tags = ['Workout Template']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/AllWorkoutTemplates" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  workoutTemplateController.getAllWorkoutTemplatesByUserId(req, res, next)
})

usersRouter.get('/:id/workout-templates/:templateId', (req: Request, res: Response, next: NextFunction) => {
  /*  
    #swagger.tags = ['Workout Template']
    #swagger.responses[200] = { schema:{ $ref: "#/definitions/WorkoutTemplate" } }
    #swagger.security = [{"bearerAuth": []}]
  */

  workoutTemplateController.getWorkoutTemplatesById(req, res, next)
})

usersRouter.post('/:id/workout-templates', (req: Request, res: Response, next: NextFunction) => {
  /*  
    #swagger.tags = ['Workout Template']
    #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/CreateWorkoutTemplateBody" } }
    #swagger.responses[200] = { schema:{ $ref: "#/definitions/WorkoutTemplate" } }
    #swagger.security = [{"bearerAuth": []}]
  */

  workoutTemplateController.getWorkoutTemplatesById(req, res, next)
})

usersRouter.delete('/:id/workout-templates/:templateId', (req: Request, res: Response, next: NextFunction) => {
  /*  
    #swagger.tags = ['Workout Template']
    #swagger.responses[200] = { }
    #swagger.security = [{"bearerAuth": []}]
  */

  workoutTemplateController.deleteWorkoutTemplate(req, res, next)
})