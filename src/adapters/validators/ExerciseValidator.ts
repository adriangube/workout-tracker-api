import { Exercise } from '@domain/entities/exercise'
import { z } from 'zod'

export const exerciseSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string()
    .min(1, 'Exercise name is required')
    .max(250, 'Exercise name too long. Maximum 250 characters'),
  description: z.string()
    .max(250, 'Exercise description too long. Maximum 250 characters')
    .optional()
})

export const exerciseValidator = async (exercise: Exercise) =>
  await exerciseSchema.safeParseAsync(exercise)