import { MuscleGroup } from '@/muscleGroup/domain/muscleGroup'

export interface ExerciseData {
  name: string
  description?: string
  muscle_groups?: MuscleGroup[]
}


export interface Exercise {
  id: string
}