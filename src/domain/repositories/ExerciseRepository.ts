import { Exercise } from '@domain/entities/exercise'

export interface ExerciseRepository {
  getByName(name: string): Promise<Exercise | null>
  getById(id: string): Promise<Exercise | null>
  getAll(): Promise<Exercise[]>
  save(exercise: Exercise): Promise<Exercise>
  addMuscleGroup({ exerciseId, muscleGroupId }: { exerciseId: string, muscleGroupId: string }): Promise<void>
  // patch(exercise: Exercise): Promise<Exercise>
  // delete(id: string): Promise<void>
}