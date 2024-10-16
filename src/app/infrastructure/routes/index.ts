import express from 'express'
import { usersRouter } from './users'
import { muscleGroupRouter } from './muscle-groups'
import { exercisesRouter } from './exercises'
import { authRouter } from './auth'
import { authTokenMiddleware } from '@/app/infrastructure/middlewares/authTokenMiddleware'
export const router = express.Router()

router.use('/api/users', authTokenMiddleware, usersRouter)
router.use('/api/muscle-groups', authTokenMiddleware, muscleGroupRouter)
router.use('/api/exercises', authTokenMiddleware,  exercisesRouter)
router.use('/api/auth', authRouter)