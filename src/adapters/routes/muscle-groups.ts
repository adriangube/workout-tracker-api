import express, { NextFunction, Request, Response }  from 'express'
import { MuscleGroupRepositoryImpl } from '@infrastructure/repositories/MuscleGroupRepositoryImpl'
import { MuscleGroupService } from '@application/services/MuscleGroupService'
import { MuscleGroupController } from '@adapters/controllers/MuscleGroupController'
import { UserRepositoryImpl } from '@infrastructure/repositories/UserRepositoryImpl'
import { AuthService } from '@application/services/AuthService'

export const muscleGroupRouter = express.Router()

const muscleGroupRepository = new MuscleGroupRepositoryImpl()
const userRepository = new UserRepositoryImpl()
const muscleGroupService = new MuscleGroupService(muscleGroupRepository)
const authService = new AuthService(userRepository)
const muscleGroupController = new MuscleGroupController(muscleGroupService, authService)

muscleGroupRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Muscle Groups']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroup" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  muscleGroupController.getMuscleGroup(req, res, next)
})
muscleGroupRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Muscle Groups']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroups" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  muscleGroupController.getAllMuscleGroups(req, res, next)
})
muscleGroupRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Internal']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/MuscleGroupCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroup" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  muscleGroupController.createMuscleGroup(req, res, next)
})
muscleGroupRouter.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Internal']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/MuscleGroupCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroup" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  muscleGroupController.updateMuscleGroup(req, res, next)
}) 
muscleGroupRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Internal']
  #swagger.responses[200] = {}
  #swagger.security = [{"bearerAuth": []}]
*/
  muscleGroupController.deleteMuscleGroup(req, res, next)
})