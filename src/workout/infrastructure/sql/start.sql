WITH workout as (
  INSERT INTO workouts(user_id, template_id, status)
  VALUES($1, $2, $3)
  RETURNING id,
    user_id,
    template_id,
    status,
    start_date
)
SELECT w.id,
  w.user_id,
  w.template_id,
  w.status,
  w.start_date,
  wt.name
FROM workout w
  LEFT JOIN workout_templates wt ON w.template_id = wt.id