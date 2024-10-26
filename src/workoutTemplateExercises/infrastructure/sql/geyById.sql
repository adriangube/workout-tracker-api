SELECT wte.id,
  wte.template_id,
  wte.sets,
  wte.reps,
  wte.weight,
  e.name,
  e.description
FROM workout_template_exercises wte
  LEFT JOIN exercises e ON e.id = wte.exercise_id
WHERE wte.id = $1