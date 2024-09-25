import { CreateExerciseDTO } from '@application/services/dto/exercise.dto'
import { Exercise } from '@domain/entities/exercise'
import { z } from 'zod'

export const exerciseSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string()
    .min(1, 'Exercise name is required')
    .max(250, 'Exercise name too long. Maximum 250 characters'),
  description: z.string()
    .max(250, 'Exercise description too long. Maximum 250 characters')
    .optional(),
})

export const createExerciseSchema = exerciseSchema.extend({
  muscle_groups_id: z.array(z.string().uuid()).optional()
})

export const exerciseValidator = async (exercise: Exercise) =>
  await exerciseSchema.safeParseAsync(exercise)

export const createExerciseValidator = async (createExerciseDTO: CreateExerciseDTO) => 
  await createExerciseSchema.safeParseAsync(createExerciseDTO)