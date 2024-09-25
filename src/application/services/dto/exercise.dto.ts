
export interface ExerciseDTO {
  name: string
  description?: string
}

export interface CreateExerciseDTO extends ExerciseDTO {
  muscle_groups_id?: string[]
}