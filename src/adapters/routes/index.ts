import express from 'express'
import { usersRouter } from './users'
import { muscleGroupRouter } from './muscle-groups'
import { exercisesRouter } from './exercises'
import { authRouter } from './auth'

export const router = express.Router()

router.use('/api/users', usersRouter)
router.use('/api/muscle-groups', muscleGroupRouter)
router.use('/api/exercises', exercisesRouter)
router.use('/api/auth', authRouter)