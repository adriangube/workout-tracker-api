DELETE FROM workout_templates
WHERE user_id = $1
  AND id = $2