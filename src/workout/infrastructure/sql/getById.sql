SELECT w.id,
  w.user_id,
  w.status,
  w.start_date,
  w.end_date,
  wt.name,
  json_agg(
    json_build_object(
      'id',
      we.id,
      'workout_id',
      we.workout_id,
      'sets',
      we.sets,
      'reps',
      we.reps,
      'weight',
      we.weight,
      'notes',
      we.notes,
      'name',
      e.name,
      'description',
      e.description
    )
  ) FILTER (
    WHERE we.id IS NOT NULL
  ) AS exercises
FROM workouts w
  LEFT JOIN workout_exercises we ON we.workout_id = w.id
  LEFT JOIN workout_template_exercises wte ON we.template_exercise_id = wte.id
  LEFT JOIN exercises e ON wte.exercise_id = e.id
WHERE w.id = $1
GROUP BY w.id,
  w.user_id,
  w.status,
  w.start_date,
  w.end_date,
  wt.name