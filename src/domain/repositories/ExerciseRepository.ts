import { Exercise } from '@domain/entities/exercise'

export interface ExerciseRepository {
  getById(id: string): Promise<Exercise | null>
  getAll(): Promise<Exercise[]>
  save(exercise: Exercise): Promise<Exercise>
  // patch(exercise: Exercise): Promise<Exercise>
  // delete(id: string): Promise<void>
}