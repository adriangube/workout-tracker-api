UPDATE workout_exercises
SET sets = COALESCE($2, sets),
  reps = COALESCE($3, reps),
  weight = COALESCE($4, weight),
  notes = COALESCE($5, notes)
WHERE id = $1