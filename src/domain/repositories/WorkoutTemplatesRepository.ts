import { WorkoutTemplates, WorkoutTemplatesData } from '@domain/entities/workoutTemplates'

export interface WorkoutTemplatesRepository {
  getById(id: string): Promise<WorkoutTemplates>
  getAllByUserId(userId: string): Promise<WorkoutTemplates[]>
  save(userId: string, workoutTemplate: WorkoutTemplatesData): Promise<WorkoutTemplates>
  delete(userId: string, id: string): Promise<void>
}