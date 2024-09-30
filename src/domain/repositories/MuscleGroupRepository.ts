import { MuscleGroup } from '@domain/entities/muscleGroup'

export interface MuscleGroupRepository {
    getByName(name: string): Promise<MuscleGroup | null>
    getById(id: string): Promise<MuscleGroup | null>
    getAll(): Promise<MuscleGroup[]>
    save(muscleGroup: MuscleGroup): Promise<MuscleGroup>
    patch(muscleGroup: MuscleGroup): Promise<MuscleGroup>
    delete(id: string): Promise<void>
 }