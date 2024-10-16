import { UpdateWorkoutExerciseData, WorkoutExercise } from '@/workoutExercise/domain/workoutExercise'

export interface UpdateWorkoutData {
  workout_id: string
  exercises: UpdateWorkoutExerciseData[]
  end_date?: Date
}

export enum WorkoutStatus {
  STARTED = 'started',
  COMPLETED = 'completed'
}

export interface Workout {
  id: string
  user_id: string
  name: string
  status: WorkoutStatus
  start_date?: Date
  end_date?: Date
  exercises?: WorkoutExercise[]
}