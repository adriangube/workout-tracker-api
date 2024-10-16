import { z } from 'zod'
import { MuscleGroup } from '@/muscleGroup/domain/muscleGroup'

export const MuscleGroupSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string()
    .min(1, 'Muscle group name is required')
    .max(255, 'Muscle group name is too long. Maximum of 255 characters')
})


export const muscleGroupValidator = async (muscleGroup: MuscleGroup) => 
  await MuscleGroupSchema.safeParseAsync(muscleGroup)