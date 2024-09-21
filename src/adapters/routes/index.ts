import express from 'express';
import { usersRouter } from './users';

export const router = express.Router();

router.use('/api/users', usersRouter)
