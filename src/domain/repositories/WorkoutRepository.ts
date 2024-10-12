import { CompleteWorkoutData, Workout } from '@domain/entities/workout'
import { WorkoutExercise } from '@domain/entities/workout_exercise'

export interface WorkoutRepository {
  getById(id: string): Promise<Workout>
  getAllByUserId(userId: string): Promise<Workout[]>
  start(userId: string, templateId: string): Promise<Workout>
  complete(data: CompleteWorkoutData): Promise<Workout>
  delete(workoutId: string): Promise<void>
  initializeExercises(templateId: string): Promise<WorkoutExercise[]>
}