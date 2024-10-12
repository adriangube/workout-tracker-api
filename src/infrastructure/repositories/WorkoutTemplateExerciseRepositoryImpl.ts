import { WorkoutTemplateExercise, WorkoutTemplateExerciseCreation } from '@domain/entities/WorkoutTemplateExercises'
import { WorkoutTemplateExerciseRepository } from '@domain/repositories/WorkoutTemplateExerciseRepository'
import { Database } from '@infrastructure/database/client'

export class WorkoutTemplateExerciseRepositoryImpl implements WorkoutTemplateExerciseRepository {
  async getByAllWorkoutTemplateId(workoutTemplateId: string): Promise<WorkoutTemplateExercise[]> {
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT
          wte.id,
          wte.template_id,
          wte.sets,
          wte.reps,
          wte.weight,
          e.name,
          e.description
        FROM workout_template_exercises wte
        LEFT JOIN exercises e ON e.id = wte.exercise_id
        WHERE wte.template_id = $1
      `,
      values: [ workoutTemplateId ]
    }

    const response = await db.query<WorkoutTemplateExercise[]>(query)
    await db.end()
    return response.rows[0]
  }

  async getById(id: string): Promise<WorkoutTemplateExercise> {
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT
          wte.id,
          wte.template_id,
          wte.sets,
          wte.reps,
          wte.weight,
          e.name,
          e.description
        FROM workout_template_exercises wte
        LEFT JOIN exercises e ON e.id = wte.exercise_id
        WHERE wte.id = $1
      `,
      values: [ id ]
    }

    const response = await db.query<WorkoutTemplateExercise>(query)
    await db.end()
    return response.rows[0]
  }

  async save(data: WorkoutTemplateExerciseCreation): Promise<WorkoutTemplateExercise> {
    const db = await Database.getConnection()
    const query = {
      text: `
        WITH workoutTemplateExercise AS (
          INSERT INTO workout_template_exercises(exercise_id, template_id, reps, sets, weight)
          VALUES($1, $2, $3, $4, $5)
          RETURNING id, sets, reps, weight, template_id, exercise_id
        ) SELECT
            wte.id,
            wte.sets,
            wte.reps,
            wte.weight,
            wte.template_id,
            e.name,
            e.description
          FROM workoutTemplateExercise wte
          LEFT JOIN exercises e ON wte.exercise_id = e.id
      `,
      values: [ data.exercise_id, data.template_id, data.reps, data.sets, data.weight ]
    }

    const response = await db.query<WorkoutTemplateExercise>(query)
    await db.end()
    return response.rows[0]
  }

  async delete(id: string): Promise<void>{
    const db = await Database.getConnection()
    const query = {
      text: `
        DELETE FROM workout_template_exercises
        WHERE id = $id
      `,
      values: [ id ]
    }

    await db.query(query)
    await db.end()
  }
}