SELECT wte.id as template_exercise_id,
  wte.sets,
  wte.reps,
  wte.weight,
  e.name,
  e.description
FROM workout_template_exercises wte
  LEFT JOIN exercises e ON wte.exercise_id = e.id
WHERE wte.template_id = $1