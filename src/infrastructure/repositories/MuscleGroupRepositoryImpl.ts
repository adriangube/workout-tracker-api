import { MuscleGroup } from '@domain/entities/muscleGroup'
import { MuscleGroupRepository } from '@domain/repositories/MuscleGroupRepository'
import { Database } from '@infrastructure/database/client'

export class MuscleGroupRepositoryImpl implements MuscleGroupRepository {
  async getById(id: string): Promise<MuscleGroup | null> {
    const db = await Database.getConnection()

    const query = {
      text: 'SELECT id, name FROM muscle_groups WHERE id = $1',
      values: [ id ]
    }
    const response = await db.query<MuscleGroup>(query)
    await db.end()
    return response?.rows[0] ?? null
  }
    
  async getAll(): Promise<MuscleGroup[]> {
    const db = await Database.getConnection()
    const query = {
      text: 'SELECT id, name FROM muscle_groups'
    }
    const response = await db.query<MuscleGroup>(query)
    await db.end()
    return response?.rows
  }

  async save(muscleGroup: MuscleGroup): Promise<MuscleGroup> {
    const db = await Database.getConnection()
    const query = {
      text: `
              INSERT INTO muscle_groups(name)
              VALUES($1)
              RETURNING id, name
          `,
      values: [ muscleGroup.name ]
    }
    const response = await db.query<MuscleGroup>(query)
    await db.end()
    return response?.rows[0]
  }

  async patch(muscleGroup: MuscleGroup): Promise<MuscleGroup> { 
    throw new Error('Method not implemented.')
    return Promise.resolve(muscleGroup)
  }

  async delete(id: string): Promise<void> {
    const db = await Database.getConnection()
    const query = {
      text: `
              DELETE FROM muscle_groups
              WHERE id = $1
          `,
      values: [ id ]
    }
    await db.query(query)
    await db.end()
  }
}