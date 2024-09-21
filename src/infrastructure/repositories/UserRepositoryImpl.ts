import { User, UserWithPassword } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/UserRepository';
import { Database } from '@infrastructure/database/client';

export class UserRepositoryImpl implements UserRepository {
     async getById (id: string): Promise<User | null> {
        const db = await Database.getConnection()
        const query = {
            text: 'SELECT id, username, email FROM users WHERE id = $1',
            values: [id]
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
            values: [user.username, user.email, user.password]
        }
        const response = await db.query<User>(query)
        await db.end()
        return response?.rows[0]
    }
    async patch(user: User): Promise<User> {
        throw new Error('Method not implemented.');
        return Promise.resolve(user)
    }
    async delete(id: string): Promise<void>{
        const db = await Database.getConnection()
        const query = {
            text: `
                DELETE FROM users
                WHERE id = $1
            `,
            values: [id]
        }
        await db.query(query)
        await db.end()
    }
    
}