import { UpdateWorkoutExerciseData } from '@domain/entities/workout_exercise'
import { z } from 'zod'

export const updateWorkoutExerciseSchema = z.object({
  id: z.string().uuid(),
  sets: z.number().optional(),
  reps: z.number().optional(),
  weight: z.number().optional(),
  notes: z.string().optional()
})

export const updateWorkoutExerciseValidator = async(
  data: UpdateWorkoutExerciseData
) => {
  return updateWorkoutExerciseSchema.safeParseAsync(data)
}