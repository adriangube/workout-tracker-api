import { z } from 'zod'
import { CreateWorkoutTemplateDTO } from '@application/services/dto/workoutTemplate.dto'

export const workoutTemplateSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  name: z.string()
})

export const createWorkoutTemplateSchema = workoutTemplateSchema.extend({
  exercises: z.array(z.object({
    sets: z.number().optional(),
    reps: z.number().optional(),
    weight: z.number().optional(),
    exercise_id: z.string().uuid()
  })).optional()
})

export const createWorkoutTemplateValidator = async (createWorkoutTemplateDTO: CreateWorkoutTemplateDTO) => 
  await createWorkoutTemplateSchema.safeParseAsync(createWorkoutTemplateDTO)