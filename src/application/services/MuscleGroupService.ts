import { MuscleGroup, MuscleGroupData } from '@domain/entities/muscleGroup'
import { MuscleGroupRepository } from '@domain/repositories/MuscleGroupRepository'

export class MuscleGroupService {
  constructor(private muscleGroupRepository: MuscleGroupRepository) { }
  
  async getMuscleGroupByName(name: string): Promise<MuscleGroup | null>{
    return await this.muscleGroupRepository.getByName(name)
  }

  async getMuscleGroup(id: string): Promise<MuscleGroup | null> {
    return await this.muscleGroupRepository.getById(id)
  }

  async getAllMuscleGroups(): Promise<MuscleGroup[]> {
    return await this.muscleGroupRepository.getAll()
  }

  async createMuscleGroup(muscleGroup: MuscleGroupData): Promise<MuscleGroup> {
    return await this.muscleGroupRepository.save(muscleGroup)
  }

  async updateMuscleGroup(muscleGroup: MuscleGroupData): Promise<MuscleGroup> {
    return await this.muscleGroupRepository.patch(muscleGroup)
  }

  async deleteMuscleGroup(id: string): Promise<void> {
    return await this.muscleGroupRepository.delete(id)
  }
}