import {
  WorkoutTemplateExercise,
  WorkoutTemplateExerciseCreation
} from '@/workoutTemplateExercises/domain/WorkoutTemplateExercises'
import { WorkoutTemplateExerciseRepository } from '@/workoutTemplateExercises/domain/WorkoutTemplateExerciseRepository'

export class WorkoutTemplateExerciseService {
  constructor(
    private workoutTemplateExerciseRepository: WorkoutTemplateExerciseRepository
  ) { }
  
  async getAllWorkoutTemplateExerciseByWorkoutTemplateId(
    workoutTemplateId: string
  ): Promise<WorkoutTemplateExercise[]> {
    return await this.workoutTemplateExerciseRepository.getAllByWorkoutTemplateId(workoutTemplateId)
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