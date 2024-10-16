import {
  WorkoutTemplateExercise,
  WorkoutTemplateExerciseCreation
} from '@/workoutTemplateExercises/domain/WorkoutTemplateExercises'


export interface WorkoutTemplateExerciseRepository {
  getByAllWorkoutTemplateId(workoutTemplateId: string): Promise<WorkoutTemplateExercise[]>
  getById(id: string): Promise<WorkoutTemplateExercise>
  save(data: WorkoutTemplateExerciseCreation): Promise<WorkoutTemplateExercise>
  delete(id: string): Promise<void>
}