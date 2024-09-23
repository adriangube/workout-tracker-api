import { Exercise } from '@domain/entities/exercise'
import { ExerciseRepository } from '@domain/repositories/ExerciseRepository'
import { Database } from '@infrastructure/database/client'

export class ExercisesRepositoryImpl implements ExerciseRepository {
  async getById(id: string): Promise<Exercise | null> {
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT id, name, description
        FROM exercises
        WHERE id = $1
      `,
      values: [ id ]
    }
    const response = await db.query<Exercise>(query)
    await db.end()
    return response?.rows[0]
  }

  async getAll(): Promise<Exercise[]>{
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT id, name, description
        FROM exercises
      `
    }
    const response = await db.query<Exercise>(query)
    await db.end()
    return response.rows
  }

  async save(exercise: Exercise): Promise<Exercise> {
    const db = await Database.getConnection()
    const query = {
      text: `
        INSERT INTO exercises(name, description)
        VALUES($1, $2)
        RETURNING id, name, description
      `,
      values: [ exercise.name, exercise.description ]
    }
    const response = await db.query<Exercise>(query)
    await db.end()
    return response.rows[0]
  }
}