import { WorkoutTemplate, WorkoutTemplateData } from '@/workoutTemplate/domain/workoutTemplate'
import {
  WorkoutTemplateExercise,
  WorkoutTemplateExerciseCreation
} from '@/workoutTemplateExercises/domain/WorkoutTemplateExercises'

export interface WorkoutTemplateRepository {
  getById(id: string): Promise<WorkoutTemplate>
  getAllByUserId(userId: string): Promise<WorkoutTemplate[]>
  save(workoutTemplate: WorkoutTemplateData): Promise<WorkoutTemplate>
  delete(userId: string, id: string): Promise<void>
  addExercise(data: WorkoutTemplateExerciseCreation): Promise<WorkoutTemplateExercise>
}