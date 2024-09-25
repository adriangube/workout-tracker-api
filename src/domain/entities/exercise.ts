import { MuscleGroup } from './muscleGroup'

export interface Exercise {
  id?: string
  name: string
  description?: string
  muscle_groups?: MuscleGroup[]
}