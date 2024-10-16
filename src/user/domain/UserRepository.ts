import { User, UserData, UserWithPassword } from './user'

export interface UserRepository {
    getByName: (username: string, withPassword?: boolean) => Promise<User | UserWithPassword | null>
    getById: (id: string) => Promise<User | null>
    getAll: () => Promise<User[]>
    save: (user: UserWithPassword) => Promise<User>
    patch: (user: UserData) => Promise<User>
    delete: (id: string) => Promise<void>
} 