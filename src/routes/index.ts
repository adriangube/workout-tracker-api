import express from 'express';
import { usersRouter } from './users';
import { workoutsRouter } from './workouts';
import { exercisesRouter } from './exercises';

export const router = express.Router();

router.use('/api/workouts', workoutsRouter)
router.use('/api/users', usersRouter)
router.use('/api/exercises', exercisesRouter);
