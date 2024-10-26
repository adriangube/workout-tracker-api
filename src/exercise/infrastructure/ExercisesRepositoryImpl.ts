import { Exercise, ExerciseData } from '@/exercise/domain/exercise'
import { ExerciseRepository } from 'src/exercise/domain/ExerciseRepository'
import { Database } from '@/app/infrastructure/database/client'
import { loadSQL } from '@/app/infrastructure/database/loadSQL'

export class ExercisesRepositoryImpl implements ExerciseRepository {
  sqlFolderPath = 'src/exercise/infrastructure/sql'

  async getByName(name: string): Promise<Exercise | null>{
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getByName.sql' }),
      values: [ name ]
    }
    const response = await db.query<Exercise>(query)
    await db.end()
    return response?.rows[0]
  }

  async getById(id: string): Promise<Exercise | null> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getById.sql' }),
      values: [ id ]
    }
    const response = await db.query<Exercise>(query)
    await db.end()
    return response?.rows[0]
  }

  async getAll(): Promise<Exercise[]>{
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getAll.sql' }),
    }
    const response = await db.query<Exercise>(query)
    await db.end()
    return response.rows
  }

  async save(exercise: ExerciseData): Promise<Exercise> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'save.sql' }),
      values: [ exercise.name, exercise.description ]
    }
    const response = await db.query<Exercise>(query)
    await db.end()
    return response.rows[0]
  }

  async addMuscleGroup({ exerciseId, muscleGroupId }: { exerciseId: string; muscleGroupId: string }): Promise<void> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'addMuscleGroup.sql' }),
      values: [ exerciseId, muscleGroupId ]
    }
    await db.query(query)
    await db.end()
  }
}