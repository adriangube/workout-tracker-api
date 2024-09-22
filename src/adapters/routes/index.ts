import express from 'express'
import { usersRouter } from './users'
import { muscleGroupRouter } from './muscle-groups'

export const router = express.Router()

router.use('/api/users', usersRouter)
router.use('/api/muscle-groups', muscleGroupRouter)