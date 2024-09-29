import { z } from 'zod'


export const LoginSchema = z.object({
  username: z.string()
    .min(1, 'Username is required')
    .max(255, 'Username is too long. Maximum of 255 characters'),
  password: z.string()
    .min(1, 'Password is required')
    .max(255, 'Password is too long. Maximum of 255 characters')
})


export const loginValidator = async (params: { username: string, password: string }) =>
  LoginSchema.safeParseAsync(params)