import { z } from 'zod'

export const UUIDSchema = z.string().uuid()

export const uuidValidator = async (uuid: string) => await UUIDSchema.safeParseAsync(uuid)