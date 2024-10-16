import { UpdateWorkoutData, Workout } from '@/workout/domain/workout'
import { WorkoutRepository } from '@/workout/domain/WorkoutRepository'


export class WorkoutService {
  constructor(
    private workoutRepository: WorkoutRepository
  ) { }
  
  async getWorkoutById(workoutId: string): Promise<Workout>{
    return this.workoutRepository.getById(workoutId)
  }

  async getAllWorkoutsByUserId(userId: string): Promise<Workout[]>{
    return this.workoutRepository.getAllByUserId(userId)
  }

  async startWorkout(userId: string, templateId: string): Promise<Workout>{
    return this.workoutRepository.start(userId, templateId)
  }

  async updateWorkout(data: UpdateWorkoutData): Promise<Workout>{
    return this.workoutRepository.update(data)
  }

  async deleteWorkout(workoutId: string): Promise<void>{
    return this.workoutRepository.delete(workoutId)
  }
}