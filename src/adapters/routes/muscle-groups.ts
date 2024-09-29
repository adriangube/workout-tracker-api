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
*/
  muscleGroupController.getMuscleGroup(req, res)
})
muscleGroupRouter.get('/', (req, res) => {
/*  
  #swagger.tags = ['Muscle Groups']
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroups" } } 
*/
  muscleGroupController.getAllMuscleGroups(req, res)
})
muscleGroupRouter.post('/', (req, res) => {
/*  
  #swagger.tags = ['Muscle Groups']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/MuscleGroupCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroup" } } 
*/
  muscleGroupController.createMuscleGroup(req, res)
})
muscleGroupRouter.patch('/:id', (req, res) => {
/*  
  #swagger.tags = ['Muscle Groups']
  #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/MuscleGroupCreationBody" } }
  #swagger.responses[200] = { schema:{ $ref: "#/definitions/MuscleGroup" } } 
*/
  muscleGroupController.updateMuscleGroup(req, res)
}) 
muscleGroupRouter.delete('/:id', (req, res) => {
/*  
  #swagger.tags = ['Muscle Groups']
  #swagger.responses[200] = {} 
*/
  muscleGroupController.deleteMuscleGroup(req, res)
})