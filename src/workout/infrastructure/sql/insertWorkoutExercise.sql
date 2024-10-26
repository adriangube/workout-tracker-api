INSERT INTO workout_exercises(
    workout_id,
    template_exercise_id,
    sets,
    reps,
    weight
  )
VALUES ($1, $2, $3, $4, $5)
RETURNING id