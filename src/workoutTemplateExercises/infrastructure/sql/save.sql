WITH workoutTemplateExercise AS (
  INSERT INTO workout_template_exercises(exercise_id, template_id, reps, sets, weight)
  VALUES($1, $2, $3, $4, $5)
  RETURNING id,
    sets,
    reps,
    weight,
    template_id,
    exercise_id
)
SELECT wte.id,
  wte.sets,
  wte.reps,
  wte.weight,
  wte.template_id,
  e.name,
  e.description
FROM workoutTemplateExercise wte
  LEFT JOIN exercises e ON wte.exercise_id = e.id