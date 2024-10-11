import { WorkoutTemplate, WorkoutTemplateData } from '@domain/entities/workoutTemplate'
import { WorkoutTemplateExercise, WorkoutTemplateExerciseCreation } from '@domain/entities/WorkoutTemplateExercises'

export interface WorkoutTemplateRepository {
  getById(id: string): Promise<WorkoutTemplate>
  getAllByUserId(userId: string): Promise<WorkoutTemplate[]>
  save(workoutTemplate: WorkoutTemplateData): Promise<WorkoutTemplate>
  delete(userId: string, id: string): Promise<void>
  addExercise(data: WorkoutTemplateExerciseCreation): Promise<WorkoutTemplateExercise>
}