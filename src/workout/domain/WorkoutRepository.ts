import { UpdateWorkoutData, Workout } from '@/workout/domain/workout'

export interface WorkoutRepository {
  getById(id: string): Promise<Workout>
  getAllByUserId(userId: string): Promise<Workout[]>
  start(userId: string, templateId: string): Promise<Workout>
  update(data: UpdateWorkoutData): Promise<Workout>
  delete(workoutId: string): Promise<void>
}