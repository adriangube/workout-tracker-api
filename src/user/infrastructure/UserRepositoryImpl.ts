import { User, UserData, UserWithPassword } from '@/user/domain/user'
import { UserRepository } from '@/user/domain/UserRepository'
import { Database } from '@/app/infrastructure/database/client'
import { config } from '@/app/config'
import { hashPassword } from '@/auth/utils/password'

export class UserRepositoryImpl implements UserRepository {

  async getByName(userName: string, withPassword: boolean = false): Promise<User | UserWithPassword | null> {
    const db = await Database.getConnection()
    let query

    if (withPassword) {
      query = {
        text: `
          SELECT id, username, email, password
          FROM users
          WHERE username = $1
        `,
        values: [ userName ]
      }
    } else {
      query = {
        text: `
          SELECT id, username, email
          FROM users
          WHERE username = $1
        `,
        values: [ userName ]
      }
    }

    const response = await db.query<User | UserWithPassword>(query)
    await db.end()
    return response?.rows[0] ?? null
  }

  async getById (id: string): Promise<User | null> {
    const db = await Database.getConnection()
    const query = {
      text: 'SELECT id, username, email FROM users WHERE id = $1',
      values: [ id ]
    }
    const response = await db.query<User>(query)
    await db.end()
    return response?.rows[0] ?? null
  };
  async getAll(): Promise<User[]> {
    const db = await Database.getConnection()
    const query = {
      text: 'SELECT id, username, email FROM users',
    }
    const response = await db.query<User>(query)
    await db.end()
    return response?.rows
  }
  async save(user: UserWithPassword): Promise<User> {
    const db = await Database.getConnection()
    const query = {
      text: `
                INSERT INTO users(username, email, password)
                VALUES($1, $2, $3)
                RETURNING id, username, email
            `,
      values: [ user.username, user.email, user.password ]
    }
    const response = await db.query<User>(query)
    await db.end()
    return response?.rows[0]
  }
  async patch(user: UserData): Promise<User> {
    throw new Error('Method not implemented.')
    return Promise.resolve(user as User)
  }
  async delete(id: string): Promise<void>{
    const db = await Database.getConnection()
    const query = {
      text: `
                DELETE FROM users
                WHERE id = $1
            `,
      values: [ id ]
    }
    await db.query(query)
    await db.end()
  }
  async createAdminUserIfNotExists(): Promise<void>{
    const db = await Database.getConnection()
    const password = await hashPassword(config.ADMIN_PASSWORD as string)
    const query = {
      text: `
          INSERT INTO users (username, email, password)
          VALUES ($1, $2, $3)
          ON CONFLICT (username) DO NOTHING;
        `,
      values: [ config.ADMIN_USERNAME, config.ADMIN_EMAIL, password ]
    }
    await db.query(query)
    await db.end()
  }
}