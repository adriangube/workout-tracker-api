WITH inserted AS (
  INSERT INTO workout_template_exercises(
      sets,
      reps,
      weight,
      exercise_id,
      template_id
    )
  VALUES($1, $2, $3, $4, $5)
  RETURNING id,
    sets,
    reps,
    weight,
    template_id,
    exercise_id
)
SELECT i.id,
  i.sets,
  i.reps,
  i.weight,
  i.template_id,
  e.name,
  e.description
FROM inserted i
  JOIN exercises e ON i.exercise_id = e.id