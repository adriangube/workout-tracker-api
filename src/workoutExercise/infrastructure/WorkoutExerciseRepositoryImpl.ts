import { WorkoutExercise, UpdateWorkoutExerciseData } from '@/workoutExercise/domain/workoutExercise'
import { WorkoutExerciseRepository } from '@/workoutExercise/domain/WorkoutExerciseRepository'
import { Database } from '@/app/infrastructure/database/client'

export class WorkoutExerciseRepositoryImpl implements WorkoutExerciseRepository {
  async getById(id: string): Promise<WorkoutExercise> {
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT
          we.id,
          we.workout_id,
          we.sets,
          we.reps,
          we.weight,
          we.notes,
          e.name,
          e.description
        FROM workout_exercises we
        LEFT JOIN workout_template_exercises wte ON we.template_exercise_id = wte.id
        LEFT JOIN exercises e ON wte.exercise_id = e.id
        WHERE we.id = $1
      `,
      values: [ id ]
    }
    const response = await db.query<WorkoutExercise>(query)
    return response.rows[0]
  }
  async getAllByWorkoutId(workoutId: string): Promise<WorkoutExercise[]> {
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT
          we.id,
          we.workout_id,
          we.sets,
          we.reps,
          we.weight,
          we.notes,
          e.name,
          e.description
        FROM workout_exercises we
        LEFT JOIN workout_template_exercises wte ON we.template_exercise_id = wte.id
        LEFT JOIN exercises e ON wte.exercise_id = e.id
        WHERE we.workout_id = $1
      `,
      values: [ workoutId ]
    }
    const response = await db.query<WorkoutExercise[]>(query)
    return response.rows[0]
  }
  async update(data: UpdateWorkoutExerciseData): Promise<WorkoutExercise> {
    const { id, sets, reps, weight, notes } = data

    const db = await Database.getConnection()
    const query = {
      text: `
        WITH updatedExercise AS (
          UPDATE workout_exercises
          SET
            sets = COALESCE($2, sets),
            reps = COALESCE($3, reps),
            weight = COALESCE($4, weight),
            notes = COALESCE($5, notes)
          WHERE id = $1
          RETURNING id, workout_id, sets, reps, weight, notes, template_exercise_id
        ) SELECT
            we.id,
            we.workout_id,
            we.sets,
            we.reps,
            we.weight,
            we.notes,
            e.name,
            e.description
          FROM updatedExercise we
          LEFT JOIN workout_template_exercises wte ON we.template_exercise_id = wte.id
          LEFT JOIN exercises e ON wte.exercise_id = e.id
      `,
      values: [ id, sets, reps, weight, notes ]
    }
    const response = await db.query<WorkoutExercise>(query)
    return response.rows[0]
  }
}