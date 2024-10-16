import { MuscleGroup, MuscleGroupData } from '@/muscleGroup/domain/muscleGroup'

export interface MuscleGroupRepository {
    getByName(name: string): Promise<MuscleGroup | null>
    getById(id: string): Promise<MuscleGroup | null>
    getAll(): Promise<MuscleGroup[]>
    save(muscleGroup: MuscleGroupData): Promise<MuscleGroup>
    patch(muscleGroup: MuscleGroupData): Promise<MuscleGroup>
    delete(id: string): Promise<void>
 }