import { CreateWorkoutTemplateDTO } from '@/workoutTemplate/application/workoutTemplate.dto'
import { WorkoutTemplateData } from '@/workoutTemplate/domain/workoutTemplate'


export class WorkoutTemplateMapper {
  static dto_to_domain(dto: CreateWorkoutTemplateDTO): WorkoutTemplateData {
    return {
      user_id: dto.user_id,
      name: dto.name,
      
    }
  }
}