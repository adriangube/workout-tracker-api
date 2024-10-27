import {
  WorkoutTemplateExercise,
  WorkoutTemplateExerciseCreation
} from '@/workoutTemplateExercises/domain/WorkoutTemplateExercises'
import {
  WorkoutTemplateExerciseRepository
} from '@/workoutTemplateExercises/domain/WorkoutTemplateExerciseRepository'
import { Database } from '@/app/infrastructure/database/client'
import { loadSQL } from '@/app/infrastructure/database/loadSQL'

export class WorkoutTemplateExerciseRepositoryImpl implements WorkoutTemplateExerciseRepository {

  sqlFolderPath = 'src/workoutTemplateExercises/infrastructure/sql'

  async getAllByWorkoutTemplateId(workoutTemplateId: string): Promise<WorkoutTemplateExercise[]> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getAllByWorkoutTemplateId.sql' }),
      values: [ workoutTemplateId ]
    }

    const response = await db.query<WorkoutTemplateExercise>(query)
    await db.end()
    return response.rows
  }

  async getById(id: string): Promise<WorkoutTemplateExercise> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getById.sql' }),
      values: [ id ]
    }

    const response = await db.query<WorkoutTemplateExercise>(query)
    await db.end()
    return response.rows[0]
  }

  async save(data: WorkoutTemplateExerciseCreation): Promise<WorkoutTemplateExercise> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'save.sql' }),
      values: [ data.exercise_id, data.template_id, data.reps, data.sets, data.weight ]
    }

    const response = await db.query<WorkoutTemplateExercise>(query)
    await db.end()
    return response.rows[0]
  }

  async delete(id: string): Promise<void>{
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'delete.sql' }),
      values: [ id ]
    }

    await db.query(query)
    await db.end()
  }
}