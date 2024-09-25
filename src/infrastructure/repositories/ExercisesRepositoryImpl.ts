import { Exercise } from '@domain/entities/exercise'
import { ExerciseRepository } from '@domain/repositories/ExerciseRepository'
import { Database } from '@infrastructure/database/client'

export class ExercisesRepositoryImpl implements ExerciseRepository {
  async getById(id: string): Promise<Exercise | null> {
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT e.id,
        e.name,
        e.description,
        CASE
          WHEN COUNT(mg.id) = 0 THEN NULL
          ELSE json_agg(
            json_build_object(
              'id', mg.id,
              'name', mg.name
            )
          )
          END as muscle_groups
        FROM exercises e
        LEFT JOIN exercise_muscle_groups emg ON e.id = emg.exercise_id
        LEFT JOIN muscle_groups mg ON mg.id = emg.muscle_group_id
        WHERE e.id = $1
        GROUP BY e.id
      `,
      values: [ id ]
    }
    const response = await db.query<Exercise>(query)
    await db.end()
    return response?.rows[0]
  }

  async getAll(): Promise<Exercise[]>{
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT e.id,
        e.name,
        e.description,
        CASE
          WHEN COUNT(mg.id) = 0 THEN NULL
          ELSE json_agg(
            json_build_object(
              'id', mg.id,
              'name', mg.name
            )
          )
        END as muscle_groups
        FROM exercises e
        LEFT JOIN exercise_muscle_groups emg ON e.id = emg.exercise_id
        LEFT JOIN muscle_groups mg ON mg.id = emg.muscle_group_id
        GROUP BY e.id
      `
    }
    const response = await db.query<Exercise>(query)
    await db.end()
    return response.rows
  }

  async save(exercise: Exercise): Promise<Exercise> {
    const db = await Database.getConnection()
    const query = {
      text: `
        INSERT INTO exercises(name, description)
        VALUES($1, $2)
        RETURNING id, name, description
      `,
      values: [ exercise.name, exercise.description ]
    }
    const response = await db.query<Exercise>(query)
    await db.end()
    return response.rows[0]
  }

  async addMuscleGroup({ exerciseId, muscleGroupId }: { exerciseId: string; muscleGroupId: string }): Promise<void> {
    const db = await Database.getConnection()
    const query = {
      text: `
        INSERT INTO exercise_muscle_groups(exercise_id, muscle_group_id)
        VALUES($1, $2)
      `,
      values: [ exerciseId, muscleGroupId ]
    }
    await db.query(query)
    await db.end()
  }
}