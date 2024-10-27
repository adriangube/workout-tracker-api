UPDATE workouts
SET end_date = $2,
  status = 'completed'
WHERE id = $1