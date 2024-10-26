SELECT we.id,
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