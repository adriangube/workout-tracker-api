import { WorkoutTemplateExercise } from './WorkoutTemplateExercises'

export interface WorkoutTemplateData {
  user_id: string
  name: string
  exercises?: WorkoutTemplateExercise[]
}

export interface WorkoutTemplate extends  WorkoutTemplateData{
  id: string
}