import { UpdateWorkoutExerciseData, WorkoutExercise } from './workout_exercise'

export interface CompleteWorkoutData {
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