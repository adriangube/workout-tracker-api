import { UpdateWorkoutExerciseData, WorkoutExercise } from '@domain/entities/workout_exercise'
import { WorkoutExerciseRepository } from '@domain/repositories/WorkoutExerciseRepository'


export class WorkoutExerciseService {
  constructor(
    private workoutExerciseRepository: WorkoutExerciseRepository
  ) { }
  
  async getWorkoutExerciseById(id: string): Promise<WorkoutExercise>{
    return this.workoutExerciseRepository.getById(id)
  }

  async getAllWorkoutExercises(workoutId: string): Promise<WorkoutExercise[]>{
    return this.workoutExerciseRepository.getAllByWorkoutId(workoutId)
  }

  async updateWorkoutExercise(data: UpdateWorkoutExerciseData): Promise<WorkoutExercise> {
    return this.workoutExerciseRepository.update(data)
  }
}