
interface ExerciseDTO {
  sets?: number
  reps?: number
  weight?: number
  exercise_id: string
}

export interface CreateWorkoutTemplateDTO {
  user_id: string
  name: string
  exercises?: ExerciseDTO[]
}