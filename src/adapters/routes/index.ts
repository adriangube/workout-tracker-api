import express from 'express'
import { usersRouter } from './users'
import { muscleGroupRouter } from './muscle-groups'
import { exercisesRouter } from './exercises'

export const router = express.Router()

router.use('/api/users', usersRouter)
router.use('/api/muscle-groups', muscleGroupRouter)
router.use('/api/exercises', exercisesRouter)