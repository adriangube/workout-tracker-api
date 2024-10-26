INSERT INTO workout_templates(user_id, name)
VALUES($1, $2)
RETURNING id,
  user_id,
  name