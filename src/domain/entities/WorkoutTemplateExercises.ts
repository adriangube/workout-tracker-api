export interface WorkoutTemplateData {
  template_id: string
  exerciseId: string
  sets?: number
  reps?: number
  weight?: number
}

export interface WorkoutTemplateExercises extends WorkoutTemplateData{
  id: string
}