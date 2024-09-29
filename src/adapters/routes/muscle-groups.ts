import express from 'express'
import { MuscleGroupRepositoryImpl } from '@infrastructure/repositories/MuscleGroupRepositoryImpl'
import { MuscleGroupService } from '@application/services/MuscleGroupService'
import { MuscleGroupController } from '@adapters/controllers/MuscleGroupController'

export const muscleGroupRouter = express.Router()

const muscleGroupRepository = new MuscleGroupRepositoryImpl()
const muscleGroupService = new MuscleGroupService(muscleGroupRepository)
const muscleGroupController = new MuscleGroupController(muscleGroupService)

muscleGroupRouter.get('/:id', (req, res) => {
/*  
  #swagger.tags = ['Muscle Groups']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroup" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  muscleGroupController.getMuscleGroup(req, res)
})
muscleGroupRouter.get('/', (req, res) => {
/*  
  #swagger.tags = ['Muscle Groups']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroups" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  muscleGroupController.getAllMuscleGroups(req, res)
})
muscleGroupRouter.post('/', (req, res) => {
/*  
  #swagger.tags = ['Muscle Groups']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/MuscleGroupCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroup" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  muscleGroupController.createMuscleGroup(req, res)
})
muscleGroupRouter.patch('/:id', (req, res) => {
/*  
  #swagger.tags = ['Muscle Groups']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/MuscleGroupCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroup" } }
  #swagger.security = [{"bearerAuth": []}]
*/
  muscleGroupController.updateMuscleGroup(req, res)
}) 
muscleGroupRouter.delete('/:id', (req, res) => {
/*  
  #swagger.tags = ['Muscle Groups']
  #swagger.responses[200] = {}
  #swagger.security = [{"bearerAuth": []}]
*/
  muscleGroupController.deleteMuscleGroup(req, res)
})