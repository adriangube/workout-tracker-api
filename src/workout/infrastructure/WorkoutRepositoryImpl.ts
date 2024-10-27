import { UpdateWorkoutData, Workout, WorkoutStatus } from '@/workout/domain/workout'
import { UpdateWorkoutExerciseData, WorkoutExercise } from '@/workoutExercise/domain/workoutExercise'
import { WorkoutRepository } from '@/workout/domain/WorkoutRepository'
import { Database } from '@/app/infrastructure/database/client'
import { loadSQL } from '@/app/infrastructure/database/loadSQL'

export class WorkoutRepositoryImpl implements WorkoutRepository{

  sqlFolderPath = 'src/workout/infrastructure/sql'

  async getById(id: string): Promise<Workout> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getById.sql' }),
      values: [ id ]
    }
    const response = await db.query<Workout>(query)
    await db.end()
    return response.rows[0]
  }

  async getAllByUserId(userId: string): Promise<Workout[]> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getAllByUserId.sql' }),
      values: [ userId ]
    }
    const response = await db.query<Workout>(query)
    await db.end()
    return response.rows
  }

  async start(userId: string, templateId: string): Promise<Workout> {
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'start.sql' }),
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
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'getTemplateExerciseByTemplateId.sql' }), 
      values: [ templateId ]
    }

    const response = await db.query(query)
    await db.end()
    return response.rows
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
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'updateWorkout.sql' }), 
      values: [ workoutId, date ]
    }
    await db.query(query)
    await db.end()
  }

  private async updateWorkoutExercise(data: UpdateWorkoutExerciseData): Promise<void> {
    const { id, sets, reps, weight, notes } = data
    const db = await Database.getConnection()
    
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'updateWorkoutExercise.sql' }),
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
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'deleteWorkout.sql' }),
      values: [ workoutId ]
    }
    await db.query(query)
    await db.end()
  }

  private async deleteWorkoutExercises(workoutId: string): Promise<void>{
    const db = await Database.getConnection()
    const query = {
      text: loadSQL({ folderPath: this.sqlFolderPath, filename: 'deleteWorkoutExercise.sql' }),
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