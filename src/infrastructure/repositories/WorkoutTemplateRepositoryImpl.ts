import { WorkoutTemplate, WorkoutTemplateData } from '@domain/entities/workoutTemplate'
import { WorkoutTemplateExerciseCreation, WorkoutTemplateExercise } from '@domain/entities/WorkoutTemplateExercises'
import { WorkoutTemplateRepository } from '@domain/repositories/WorkoutTemplateRepository'
import { Database } from '@infrastructure/database/client'

export class WorkoutTemplateRepositoryImpl implements WorkoutTemplateRepository {
  async getById(id: string): Promise<WorkoutTemplate>{
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT
          wt.id,
          wt.name,
          wt.user_id,
          CASE
            WHEN COUNT(wte.id) = 0 THEN NULL
            ELSE json_agg(
              json_build_object(
                'id', wte.id,
                'template_id', wte.template_id,
                'sets', wte.sets,
                'reps', wte.reps,
                'weight', wte.weight,
                'name', e.name,
                'description', e.description
              )
            )
            END as exercises
        FROM workout_templates wt
        LEFT JOIN workout_template_exercises wte ON wt.id = wte.template_id
        LEFT JOIN exercises e ON wte.exercise_id = e.id
        WHERE wt.id = $1
        GROUP BY wt.id
      `,
      values: [ id ]
    }
    const response = await db.query<WorkoutTemplate>(query)
    await db.end()
    return response?.rows[0]
  }

  async getAllByUserId(userId: string): Promise<WorkoutTemplate[]> {
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT
          wt.id,
          wt.name,
          wt.user_id,
          CASE
            WHEN COUNT(wte.id) = 0 THEN NULL
            ELSE json_agg(
              json_build_object(
                'id', wte.id,
                'template_id', wte.template_id,
                'sets', wte.sets,
                'reps', wte.reps,
                'weight', wte.weight,
                'name', e.name,
                'description', e.description
              )
            )
            END as exercises
        FROM workout_templates wt
        LEFT JOIN workout_template_exercises wte ON wt.id = wte.template_id
        LEFT JOIN exercises e ON wte.exercise_id = e.id
        WHERE wt.user_id = $1
        GROUP BY wt.id
      `,
      values: [ userId ]
    }
    const response = await db.query<WorkoutTemplate[]>(query)
    await db.end()
    return response?.rows[0]
  }

  async save(workoutTemplate: WorkoutTemplateData): Promise<WorkoutTemplate> {
    const db = await Database.getConnection()
    const query = {
      text: `
        INSERT INTO workout_templates(user_id, name)
        VALUES($1, $2)
        RETURNING id, user_id, name
      `,
      values: [ workoutTemplate.user_id, workoutTemplate.name ]
    }
    const response = await db.query<WorkoutTemplate>(query)
    await db.end()
    return response?.rows[0]
  }

  async delete(userId: string, id: string): Promise<void> {
    const db = await Database.getConnection()
    const query = {
      text: `
        DELETE FROM workout_templates
        WHERE user_id = $1 AND id = $2
      `,
      values: [ userId, id ]
    }
    await db.query(query)
    await db.end()
  }

  async addExercise(data: WorkoutTemplateExerciseCreation): Promise<WorkoutTemplateExercise> {
    const db = await Database.getConnection()
    const query = {
      text: `
      WITH inserted AS (
        INSERT INTO workout_template_exercises(
          sets,
          reps,
          weight,
          exercise_id,
          template_id
        )
        VALUES($1, $2, $3, $4, $5)
        RETURNING id, sets, reps, weight, template_id, exercise_id
      ) SELECT
          i.id,
          i.sets,
          i.reps,
          i.weight,
          i.template_id,
          e.name,
          e.description
        FROM inserted i
        JOIN exercises e ON i.exercise_id = e.id 
      `,
      values: [
        data.sets,
        data.reps,
        data.weight,
        data.exercise_id,
        data.template_id
      ]
    }
    const response = await db.query<WorkoutTemplateExercise>(query)
    await db.end()
    return response.rows[0]
  }
}