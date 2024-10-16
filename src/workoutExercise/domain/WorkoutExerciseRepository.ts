import { UpdateWorkoutExerciseData, WorkoutExercise } from '@/workoutExercise/domain/workoutExercise'

export interface WorkoutExerciseRepository {
  getById(id: string): Promise<WorkoutExercise>
  getAllByWorkoutId(workoutId: string): Promise<WorkoutExercise[]>
  update(data: UpdateWorkoutExerciseData): Promise<WorkoutExercise>
}