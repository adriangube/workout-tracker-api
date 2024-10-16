import { MuscleGroup, MuscleGroupData } from '@/muscleGroup/domain/muscleGroup'
import { MuscleGroupRepository } from '@/muscleGroup/domain/MuscleGroupRepository'
import { Database } from '@/app/infrastructure/database/client'

export class MuscleGroupRepositoryImpl implements MuscleGroupRepository {

  async getByName(name: string): Promise<MuscleGroup | null>{
    const db = await Database.getConnection()

    const query = {
      text: 'SELECT id, name FROM muscle_groups WHERE name = $1',
      values: [ name ]
    }
    const response = await db.query<MuscleGroup>(query)
    await db.end()
    return response?.rows[0] ?? null
  }

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

  async save(muscleGroup: MuscleGroupData): Promise<MuscleGroup> {
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

  async patch(muscleGroup: MuscleGroupData): Promise<MuscleGroup> { 
    throw new Error('Method not implemented.')
    return Promise.resolve(muscleGroup as unknown as MuscleGroup)
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