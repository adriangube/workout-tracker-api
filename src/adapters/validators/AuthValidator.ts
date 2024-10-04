import { z } from 'zod'


export const TokenSchema = z.object({
  username: z.string()
    .min(1, 'Username is required')
    .max(255, 'Username is too long. Maximum of 255 characters'),
  password: z.string()
    .min(1, 'Password is required')
    .max(255, 'Password is too long. Maximum of 255 characters')
})


export const tokenValidator = async (params: { username: string, password: string }) =>
  TokenSchema.safeParseAsync(params)