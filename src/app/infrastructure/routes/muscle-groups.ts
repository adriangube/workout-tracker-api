import express, { NextFunction, Request, Response }  from 'express'
import { MuscleGroupRepositoryImpl } from '@/muscleGroup/infrastructure/MuscleGroupRepositoryImpl'
import { MuscleGroupService } from '@/muscleGroup/application/MuscleGroupService'
import { MuscleGroupController } from '@/muscleGroup/infrastructure/MuscleGroupController'
import { UserRepositoryImpl } from '@/user/infrastructure/UserRepositoryImpl'
import { AuthService } from '@/auth/application/AuthService'

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
  #swagger.description = Get a muscle group
*/
  muscleGroupController.getMuscleGroup(req, res, next)
})
muscleGroupRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Muscle Groups']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroups" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Get all muscle groups
*/
  muscleGroupController.getAllMuscleGroups(req, res, next)
})
muscleGroupRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Internal']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/MuscleGroupCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroup" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Create a muscle group
*/
  muscleGroupController.createMuscleGroup(req, res, next)
})
muscleGroupRouter.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Internal']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/MuscleGroupCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroup" } }
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Partially update a muscle group
*/
  muscleGroupController.updateMuscleGroup(req, res, next)
}) 
muscleGroupRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
/*  
  #swagger.tags = ['Internal']
  #swagger.responses[200] = {}
  #swagger.security = [{"bearerAuth": []}]
  #swagger.description = Delete a muscle group
*/
  muscleGroupController.deleteMuscleGroup(req, res, next)
})