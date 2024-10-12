import { CreateWorkoutTemplateDTO } from '@application/services/dto/workoutTemplate.dto'
import { WorkoutTemplateData } from '@domain/entities/workoutTemplate'


export class WorkoutTemplateMapper {
  static dto_to_domain(dto: CreateWorkoutTemplateDTO): WorkoutTemplateData {
    return {
      user_id: dto.user_id,
      name: dto.name,
      
    }
  }
}