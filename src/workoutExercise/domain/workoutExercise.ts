
export interface UpdateWorkoutExerciseData {
  id: string
  sets?: number
  reps?: number
  weight?: number
  notes?: string
}

export interface WorkoutExercise {
  id: string
  workout_id: string
  name: string
  description?: string
  sets?: number
  reps?: number
  weight?: number
  notes?: string
}