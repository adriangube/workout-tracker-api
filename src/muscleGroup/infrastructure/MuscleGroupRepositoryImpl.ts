import { MuscleGroup, MuscleGroupData } from '@/muscleGroup/domain/muscleGroup'
import { MuscleGroupRepository } from '@/muscleGroup/domain/MuscleGroupRepository'
import { Database } from '@/app/infrastructure/database/client'
import { loadSQL } from '@/app/infrastructure/database/loadSQL'

export class MuscleGroupRepositoryImpl implements MuscleGroupRepository {

  sqlFolderPath = 'src/muscleGroup/infrastructure/sql'

  async getByName(name: string): Promise<MuscleGroup | null>{
    const db = await Database.getConnection()

    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getByName.sql' }),
      values: [ name ]
    }
    const response = await db.query<MuscleGroup>(query)
    await db.end()
    return response?.rows[0] ?? null
  }

  async getById(id: string): Promise<MuscleGroup | null> {
    const db = await Database.getConnection()

    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getById.sql' }),
      values: [ id ]
    }
    const response = await db.query<MuscleGroup>(query)
    await db.end()
    return response?.rows[0] ?? null
  }
    
  async getAll(): Promise<MuscleGroup[]> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getAll.sql' }),
    }
    const response = await db.query<MuscleGroup>(query)
    await db.end()
    return response?.rows
  }

  async save(muscleGroup: MuscleGroupData): Promise<MuscleGroup> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'save.sql' }),
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
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'delete.sql' }),
      values: [ id ]
    }
    await db.query(query)
    await db.end()
  }
}