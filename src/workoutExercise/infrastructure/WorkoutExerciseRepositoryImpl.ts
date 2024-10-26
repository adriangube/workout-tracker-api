import { WorkoutExercise, UpdateWorkoutExerciseData } from '@/workoutExercise/domain/workoutExercise'
import { WorkoutExerciseRepository } from '@/workoutExercise/domain/WorkoutExerciseRepository'
import { Database } from '@/app/infrastructure/database/client'
import { loadSQL } from '@/app/infrastructure/database/loadSQL'

export class WorkoutExerciseRepositoryImpl implements WorkoutExerciseRepository {

  sqlFolderPath = 'src/workoutExercise/infrastructure/sql'


  async getById(id: string): Promise<WorkoutExercise> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getById.sql' }),
      values: [ id ]
    }
    const response = await db.query<WorkoutExercise>(query)
    return response.rows[0]
  }
  async getAllByWorkoutId(workoutId: string): Promise<WorkoutExercise[]> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getAllByWorkoutId.sql' }),
      values: [ workoutId ]
    }
    const response = await db.query<WorkoutExercise[]>(query)
    return response.rows[0]
  }
  async update(data: UpdateWorkoutExerciseData): Promise<WorkoutExercise> {
    const { id, sets, reps, weight, notes } = data

    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'update.sql' }),
      values: [ id, sets, reps, weight, notes ]
    }
    const response = await db.query<WorkoutExercise>(query)
    return response.rows[0]
  }
}