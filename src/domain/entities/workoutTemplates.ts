import { WorkoutTemplateExercises } from './WorkoutTemplateExercises'

export interface WorkoutTemplatesData {
  user_id: string
  name: string
  exercises?: WorkoutTemplateExercises[]
}

export interface WorkoutTemplates {
  id: string
}