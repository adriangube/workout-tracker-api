import { WorkoutTemplateExercise, WorkoutTemplateExerciseCreation } from '@domain/entities/WorkoutTemplateExercises'
import { WorkoutTemplateExerciseRepository } from '@domain/repositories/WorkoutTemplateExerciseRepository'

export class WorkoutTemplateExerciseService {
  constructor(
    private workoutTemplateExerciseRepository: WorkoutTemplateExerciseRepository
  ) { }
  
  async getAllWorkoutTemplateExerciseByWorkoutTemplateId(
    workoutTemplateId: string
  ): Promise<WorkoutTemplateExercise[]> {
    return await this.workoutTemplateExerciseRepository.getByAllWorkoutTemplateId(workoutTemplateId)
  }

  async getWorkoutTemplateExerciseById(workoutTemplateExerciseId: string): Promise<WorkoutTemplateExercise> {
    return await this.workoutTemplateExerciseRepository.getById(workoutTemplateExerciseId)
  }

  async createWorkoutTemplateExercise(
    workoutTemplateExerciseCreation: WorkoutTemplateExerciseCreation
  ): Promise<WorkoutTemplateExercise>{
    return await this.workoutTemplateExerciseRepository.save(workoutTemplateExerciseCreation)
  }

  async deleteWorkoutTemplateExercise(
    workoutTemplateExerciseId: string
  ): Promise<void>{
    return await this.workoutTemplateExerciseRepository.delete(workoutTemplateExerciseId)
  }
}