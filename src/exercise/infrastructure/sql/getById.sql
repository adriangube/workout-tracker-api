SELECT e.id,
  e.name,
  e.description,
  CASE
    WHEN COUNT(mg.id) = 0 THEN NULL
    ELSE json_agg(
      json_build_object(
        'id',
        mg.id,
        'name',
        mg.name
      )
    )
  END as muscle_groups
FROM exercises e
  LEFT JOIN exercise_muscle_groups emg ON e.id = emg.exercise_id
  LEFT JOIN muscle_groups mg ON mg.id = emg.muscle_group_id
WHERE e.id = $1
GROUP BY e.id