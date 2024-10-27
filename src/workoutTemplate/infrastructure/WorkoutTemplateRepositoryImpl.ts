import { WorkoutTemplate, WorkoutTemplateData } from '@/workoutTemplate/domain/workoutTemplate'
import {
  WorkoutTemplateExerciseCreation,
  WorkoutTemplateExercise
} from '@/workoutTemplateExercises/domain/WorkoutTemplateExercises'
import { WorkoutTemplateRepository } from '@/workoutTemplate/domain/WorkoutTemplateRepository'
import { Database } from '@/app/infrastructure/database/client'
import { loadSQL } from '@/app/infrastructure/database/loadSQL'

export class WorkoutTemplateRepositoryImpl implements WorkoutTemplateRepository {

  sqlFolderPath = 'src/workoutTemplate/infrastructure/sql'


  async getById(id: string): Promise<WorkoutTemplate>{
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getById.sql' }),
      values: [ id ]
    }
    const response = await db.query<WorkoutTemplate>(query)
    await db.end()
    return response?.rows[0]
  }

  async getAllByUserId(userId: string): Promise<WorkoutTemplate[]> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getAllByUserId.sql' }),
      values: [ userId ]
    }
    const response = await db.query<WorkoutTemplate>(query)
    await db.end()
    return response?.rows
  }

  async save(workoutTemplate: WorkoutTemplateData): Promise<WorkoutTemplate> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'save.sql' }),
      values: [ workoutTemplate.user_id, workoutTemplate.name ]
    }
    const response = await db.query<WorkoutTemplate>(query)
    await db.end()
    return response?.rows[0]
  }

  async delete(userId: string, id: string): Promise<void> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'delete.sql' }),
      values: [ userId, id ]
    }
    await db.query(query)
    await db.end()
  }

  async addExercise(data: WorkoutTemplateExerciseCreation): Promise<WorkoutTemplateExercise> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'addExercise.sql' }),
      values: [
        data.sets,
        data.reps,
        data.weight,
        data.exercise_id,
        data.template_id
      ]
    }
    const response = await db.query<WorkoutTemplateExercise>(query)
    await db.end()
    return response.rows[0]
  }
}