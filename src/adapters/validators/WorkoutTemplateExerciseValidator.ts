import { z } from 'zod'
import { WorkoutTemplateExerciseCreation } from '@domain/entities/WorkoutTemplateExercises'


export const workoutTemplateExerciseSchema = z.object({
  sets: z.number().optional(),
  reps: z.number().optional(),
  weight: z.number().optional(),
  template_id: z.string().uuid(),
  exercise_id: z.string().uuid()
})

export const createWorkoutTemplateExerciseValidator = async (
  workoutTemplateExerciseCreation: WorkoutTemplateExerciseCreation
) => await workoutTemplateExerciseSchema.safeParseAsync(workoutTemplateExerciseCreation)