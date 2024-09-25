import { Exercise } from '@domain/entities/exercise'
import { ExerciseRepository } from '@domain/repositories/ExerciseRepository'
import { CreateExerciseDTO } from './dto/exercise.dto'

export class ExerciseService {
  constructor(private exerciseRepository: ExerciseRepository) { }
  
  async getExercise(id: string): Promise<Exercise | null>{
    return await this.exerciseRepository.getById(id)
  }

  async getAllExercises(): Promise<Exercise[]>{
    return await this.exerciseRepository.getAll()
  }

  async createExercise(exercise: CreateExerciseDTO): Promise<Exercise>{
    let newExercise = await this.exerciseRepository.save(exercise)
    
    if (exercise?.muscle_groups_id && exercise?.muscle_groups_id?.length > 0) {
      for (const muscleGroupId of exercise.muscle_groups_id) {
        await this.exerciseRepository.addMuscleGroup({ exerciseId: newExercise.id as string, muscleGroupId })
      }
      newExercise = await this.exerciseRepository.getById(newExercise.id as string) as Exercise
    }
    return newExercise
  }
}