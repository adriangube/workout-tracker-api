import { UserRepository } from '@domain/repositories/UserRepository'
import { User, UserWithPassword } from '@domain/entities/user'
import { hashPassword } from '@utils/password'

export class UserService {
  constructor(private userRepository: UserRepository) { }
    
  async getUser (id: string): Promise<User | null> {
    return await this.userRepository.getById(id)
  }

  async getAllUsers (): Promise<User[]> {
    return await this.userRepository.getAll()
  }

  async createUser(user: UserWithPassword): Promise<User> {
    const hashedPassword = await hashPassword(user.password)
    const userWithHashedPassword = { ...user, password: hashedPassword } 
    return await this.userRepository.save(userWithHashedPassword)
  }

  async updateUser (user: UserWithPassword): Promise<User> {
    return await this.userRepository.patch(user)
  }

  async deleteUser (id: string): Promise<void> {
    return await this.userRepository.delete(id)
  }
}