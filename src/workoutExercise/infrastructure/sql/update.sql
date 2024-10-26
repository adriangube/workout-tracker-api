WITH updatedExercise AS (
  UPDATE workout_exercises
  SET sets = COALESCE($2, sets),
    reps = COALESCE($3, reps),
    weight = COALESCE($4, weight),
    notes = COALESCE($5, notes)
  WHERE id = $1
  RETURNING id,
    workout_id,
    sets,
    reps,
    weight,
    notes,
    template_exercise_id
)
SELECT we.id,
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