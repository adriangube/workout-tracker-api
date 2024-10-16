import bcrypt from 'bcrypt'
import { config } from '@/app/config/index'
import { InternalServerError } from '@/app/application/errors'

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = config.SALT_ROUNDS
  return await bcrypt.hash(password, saltRounds)
}

export const isPasswordValid = async (password: string, userPassword: string): Promise<boolean> => {
  try {
    return bcrypt.compare(password, userPassword)
  } catch {
    throw new InternalServerError('Error decoding the password')
  }
}