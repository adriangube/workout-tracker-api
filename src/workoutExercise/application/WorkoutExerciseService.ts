import { UpdateWorkoutExerciseData, WorkoutExercise } from '@/workoutExercise/domain/workoutExercise'
import { WorkoutExerciseRepository } from '@/workoutExercise/domain/WorkoutExerciseRepository'


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