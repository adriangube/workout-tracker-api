import { UserRepositoryImpl } from '@/user/infrastructure/UserRepositoryImpl'

export const initializeAdminUser = () => {
  const userRepository = new UserRepositoryImpl()
  userRepository.createAdminUserIfNotExists()
}