import { User, UserWithPassword } from '../entities/user'

export interface UserRepository {
    getById: (id: string) => Promise<User | null>
    getAll: () => Promise<User[]>
    save: (user: UserWithPassword) => Promise<User>
    patch: (user: User) => Promise<User>
    delete: (id: string) => Promise<void>
}