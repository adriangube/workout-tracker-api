import { WorkoutTemplate } from '@domain/entities/workoutTemplate'
import { WorkoutTemplateRepository } from '@domain/repositories/WorkoutTemplateRepository'
import { CreateWorkoutTemplateDTO } from './dto/workoutTemplate.dto'
import { WorkoutTemplateMapper } from '@adapters/mappers/workoutTemplatesMapper'

export class WorkoutTemplateService {
  constructor(
    private workoutTemplatesRepository: WorkoutTemplateRepository
  ) { }
  
  async getWorkoutTemplatesById(id: string): Promise<WorkoutTemplate | null>{
    return await this.workoutTemplatesRepository.getById(id)
  }

  async getWorkoutAllTemplatesByUserId(userId: string): Promise<WorkoutTemplate[]>{
    return await this.workoutTemplatesRepository.getAllByUserId(userId)
  }

  async createWorkoutTemplate(workoutTemplate: CreateWorkoutTemplateDTO): Promise<WorkoutTemplate>{

    const workoutTemplateData = WorkoutTemplateMapper.dto_to_domain(workoutTemplate)
    let newTemplate = await this.workoutTemplatesRepository.save(workoutTemplateData)
    if (workoutTemplate?.exercises && ( workoutTemplate?.exercises?.length ?? 0) > 0) {
      const workoutExercises = workoutTemplate.exercises.map((value) => {
        return { ...value, template_id: newTemplate.id }
      })

      for (const exercise of workoutExercises) {
        await this.workoutTemplatesRepository.addExercise(exercise)
      }
      newTemplate = await this.workoutTemplatesRepository.getById(newTemplate.id)
    }
    return newTemplate
  }

  async deleteWorkoutTemplate(userId: string, id: string): Promise<void>{
    return this.workoutTemplatesRepository.delete(userId, id)
  }
}