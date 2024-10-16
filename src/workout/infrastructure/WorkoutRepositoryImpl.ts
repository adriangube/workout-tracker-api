import { UpdateWorkoutData, Workout, WorkoutStatus } from '@/workout/domain/workout'
import { UpdateWorkoutExerciseData, WorkoutExercise } from '@/workoutExercise/domain/workoutExercise'
import { WorkoutRepository } from '@/workout/domain/WorkoutRepository'
import { Database } from '@/app/infrastructure/database/client'

export class WorkoutRepositoryImpl implements WorkoutRepository{

  async getById(id: string): Promise<Workout> {
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT
          w.id,
          w.user_id,
          w.status,
          w.start_date,
          w.end_date,
          wt.name,
          json_agg(
              json_build_object(
                'id', we.id,
                'workout_id', we.workout_id,
                'sets', we.sets,
                'reps', we.reps,
                'weight', we.weight,
                'notes', we.notes,
                'name', e.name,
                'description', e.description
              )
            ) FILTER (WHERE we.id IS NOT NULL) AS exercises
          FROM workouts w
          LEFT JOIN workout_exercises we ON we.workout_id = w.id
          LEFT JOIN workout_template_exercises wte ON we.template_exercise_id = wte.id
          LEFT JOIN exercises e ON wte.exercise_id = e.id
          WHERE w.id = $1
          GROUP BY w.id, w.user_id, w.status, w.start_date, w.end_date, wt.name
      `,
      values: [ id ]
    }
    const response = await db.query<Workout>(query)
    await db.end()
    return response.rows[0]
  }

  async getAllByUserId(userId: string): Promise<Workout[]> {
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT
          w.id,
          w.user_id,
          w.status,
          w.start_date,
          w.end_date,
          wt.name,
          json_agg(
              json_build_object(
                'id', we.id,
                'workout_id', we.workout_id,
                'sets', we.sets,
                'reps', we.reps,
                'weight', we.weight,
                'notes', we.notes,
                'name', e.name,
                'description', e.description
              )
            ) FILTER (WHERE we.id IS NOT NULL) AS exercises
          FROM workouts w
          LEFT JOIN workout_exercises we ON we.workout_id = w.id
          LEFT JOIN workout_template_exercises wte ON we.template_exercise_id = wte.id
          LEFT JOIN exercises e ON wte.exercise_id = e.id
          LEFT JOIN workout_templates wt ON w.template_id = wt.id
          WHERE w.user_id = $1
          GROUP BY w.id, w.user_id, w.status, w.start_date, w.end_date, wt.name
      `,
      values: [ userId ]
    }
    const response = await db.query<Workout[]>(query)
    await db.end()
    return response.rows[0]
  }

  async start(userId: string, templateId: string): Promise<Workout> {
    const db = await Database.getConnection()
    const query = {
      text: `
        WITH workout as (
          INSERT INTO workouts(user_id, template_id, status)
          VALUES($1, $2, $3)
          RETURNING id, user_id, template_id, status, start_date
        ) SELECT
            w.id,
            w.user_id,
            w.template_id,
            w.status,
            w.start_date,
            wt.name
          FROM workout w
          LEFT JOIN workout_templates wt ON w.template_id = wt.id
      `,
      values: [ userId, templateId, 'started' ]
    }
    const response = await db.query<{
      id: string,
      name: string,
      user_id: string,
      template_id: string,
      status: WorkoutStatus,
      start_date: Date
    }>(query)
    await db.end()
    const baseWorkout = response.rows[0]
    const exercises = await this.initializeWorkoutExercises(baseWorkout.id, templateId)

    const workoutWithExercises = {
      id: baseWorkout.id,
      name: baseWorkout.name,
      user_id: baseWorkout.user_id,
      status: baseWorkout.status,
      start_date: baseWorkout.start_date,
      exercises
    }
    return workoutWithExercises
  }

  private async getTemplateExercisesByTemplateId(
    templateId: string
  ): Promise<{
    template_exercise_id: string,
    sets?: number,
    reps?: number,
    weight?: number,
    name: string,
    description?: string
  }[]>{
    const db = await Database.getConnection()
    const query = {
      text: `
        SELECT
          wte.id as template_exercise_id,
          wte.sets,
          wte.reps,
          wte.weight,
          e.name,
          e.description
        FROM workout_template_exercises wte
        LEFT JOIN exercises e ON wte.exercise_id = e.id
        WHERE wte.template_id = $1
      `,  
      values: [ templateId ]
    }

    const response = await db.query(query)
    await db.end()
    return response.rows[0]
  }

  private async initializeWorkoutExercises(workoutId: string, templateId: string): Promise<WorkoutExercise[]> {
    const getTemplateExercises = await this.getTemplateExercisesByTemplateId(templateId)

    async function initializeExercise(
      data: {
        workout_id: string,
        template_exercise_id: string,
        sets?: number,
        reps?: number,
        weight?: number,
      }
    ) {
      const db = await Database.getConnection()
      const query = {
        text: `
          INSERT INTO workout_exercises(
            workout_id,
            template_exercise_id,
            sets,
            reps,
            weight
          )
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id
        `,
        values: [
          data.workout_id,
          data.template_exercise_id,
          data.sets,
          data.reps,
          data.weight
        ]
      }
      const response = await db.query(query)
      await db.end()
      return response.rows[0]
    }
    const exercises: WorkoutExercise[] = []
    for (const exercise of getTemplateExercises) {
      const id = await initializeExercise({ ...exercise, workout_id: workoutId })
      exercises.push({
        id,
        workout_id: workoutId,
        name: exercise.name,
        description: exercise.description,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
      })
    }
    return exercises
  }

  private async updateWorkout(workoutId: string, endDate?: Date): Promise<void> {
    const db = await Database.getConnection()
    const date = endDate ?? new Date()
    const query = {
      text: `
        UPDATE workout
        SET end_date = $2
        WHERE id = $1
      `,
      values: [ workoutId, date ]
    }
    await db.query(query)
    await db.end()
  }

  private async updateWorkoutExercise(data: UpdateWorkoutExerciseData): Promise<void> {
    const { id, sets, reps, weight, notes } = data
    const db = await Database.getConnection()
    const query = {
      text: `
        UPDATE workout_exercises
        SET
          sets = COALESCE($2, sets),
          reps = COALESCE($3, reps),
          weight = COALESCE($4, weight),
          notes = COALESCE($5, notes)
        WHERE id = $1

      `,
      values: [ id, sets, reps, weight, notes ]
    }
    await db.query(query)
    await db.end()
  }

  async update(data: UpdateWorkoutData): Promise<Workout> {
    await this.updateWorkout(data.workout_id, data?.end_date)
    for (const exercise of data.exercises) {
      await this.updateWorkoutExercise(exercise)
    }
    return this.getById(data.workout_id)
  }

  private async deleteWorkout(workoutId: string): Promise<void>{
    const db = await Database.getConnection()
    const query = {
      text: `
        DELETE FROM workout
        WHERE id = $1
      `,
      values: [ workoutId ]
    }
    await db.query(query)
    await db.end()
  }

  private async deleteWorkoutExercises(workoutId: string): Promise<void>{
    const db = await Database.getConnection()
    const query = {
      text: `
        DELETE FROM workout_exercises
        WHERE workout_id = $1
      `,
      values: [ workoutId ]
    }
    await db.query(query)
    await db.end()
  }

  async delete(workoutId: string): Promise<void> {
    await this.deleteWorkoutExercises(workoutId)
    await this.deleteWorkout(workoutId)
  }
}