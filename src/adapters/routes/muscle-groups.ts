import express from 'express'
import { MuscleGroupRepositoryImpl } from '@infrastructure/repositories/MuscleGroupRepositoryImpl'
import { MuscleGroupService } from '@application/services/MuscleGroupService'
import { MuscleGroupController } from '@adapters/controllers/MuscleGroupController'

export const muscleGroupRouter = express.Router()

const muscleGroupRepository = new MuscleGroupRepositoryImpl()
const muscleGroupService = new MuscleGroupService(muscleGroupRepository)
const muscleGroupController = new MuscleGroupController(muscleGroupService)

muscleGroupRouter.get('/:id', muscleGroupController.getMuscleGroup.bind(muscleGroupController))
muscleGroupRouter.get('/', muscleGroupController.getAllMuscleGroups.bind(muscleGroupController))
muscleGroupRouter.post('/', muscleGroupController.createMuscleGroup.bind(muscleGroupController))
muscleGroupRouter.patch('/:id', muscleGroupController.updateMuscleGroup.bind(muscleGroupController)) 
muscleGroupRouter.delete('/:id', muscleGroupController.deleteMuscleGroup.bind(muscleGroupController))