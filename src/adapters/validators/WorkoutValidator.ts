import { UpdateWorkoutExerciseData } from '@domain/entities/workout_exercise'
import { z } from 'zod'



export const completeWorkoutSchema = z.object({
  exercises: z.array(z.object({
    id: z.string().uuid(),
    sets: z.number().optional(),
    reps: z.number().optional(),
    weight: z.number().optional(),
    notes: z.string().optional()
  })),
  end_date: z.date().optional()
})

export const completeWorkoutValidator = async (
  completeWorkoutData: { exercises: UpdateWorkoutExerciseData[], end_date?: Date }
) => {
  return completeWorkoutSchema.safeParseAsync(completeWorkoutData)
}