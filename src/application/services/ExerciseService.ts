import { Exercise } from '@domain/entities/exercise'
import { ExerciseRepository } from '@domain/repositories/ExerciseRepository'

export class ExerciseService {
  constructor(private exerciseRepository: ExerciseRepository) { }
  
  async getExercise(id: string): Promise<Exercise | null>{
    return await this.exerciseRepository.getById(id)
  }

  async getAllExercises(): Promise<Exercise[]>{
    return await this.exerciseRepository.getAll()
  }

  async createExercise(exercise: Exercise): Promise<Exercise>{
    return await this.exerciseRepository.save(exercise)
  }
}