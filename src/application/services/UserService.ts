import { UserRepository } from '@domain/repositories/UserRepository'
import { User, UserData, UserWithPassword } from '@domain/entities/user'
import { hashPassword } from '@utils/password'


export class UserService {
  constructor(private userRepository: UserRepository) { }

  async getUserByName(userName: string, withPassword: boolean = false): Promise<User | UserWithPassword | null> {
    return this.userRepository.getByName(userName, withPassword)
  }
    
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

  async updateUser (user: UserData): Promise<User> {
    return await this.userRepository.patch(user)
  }

  async deleteUser (id: string): Promise<void> {
    return await this.userRepository.delete(id)
  }
}