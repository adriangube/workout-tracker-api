import { UpdateWorkoutExerciseData, WorkoutExercise } from '@domain/entities/workout_exercise'

export interface WorkoutExerciseRepository {
  getById(id: string): Promise<WorkoutExercise>
  getAllByWorkoutId(workoutId: string): Promise<WorkoutExercise[]>
  update(data: UpdateWorkoutExerciseData): Promise<WorkoutExercise>
}