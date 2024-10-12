
export interface WorkoutTemplateExerciseCreation {
  sets?: number
  reps?: number
  weight?: number
  exercise_id: string
  template_id: string
}

export interface WorkoutTemplateExerciseData {
  template_id: string
  sets?: number
  reps?: number
  weight?: number
  name: string
  description: string
}

export interface WorkoutTemplateExercise extends WorkoutTemplateExerciseData{
  id: string
}