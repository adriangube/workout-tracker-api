SELECT wt.id,
  wt.name,
  wt.user_id,
  CASE
    WHEN COUNT(wte.id) = 0 THEN NULL
    ELSE json_agg(
      json_build_object(
        'id',
        wte.id,
        'template_id',
        wte.template_id,
        'sets',
        wte.sets,
        'reps',
        wte.reps,
        'weight',
        wte.weight,
        'name',
        e.name,
        'description',
        e.description
      )
    )
  END as exercises
FROM workout_templates wt
  LEFT JOIN workout_template_exercises wte ON wt.id = wte.template_id
  LEFT JOIN exercises e ON wte.exercise_id = e.id
WHERE wt.user_id = $1
GROUP BY wt.id