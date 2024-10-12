CREATE TABLE IF NOT EXISTS workout_exercises(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id uuid NOT NULL REFERENCES workouts(id),
  template_exercise_id uuid NOT NULL REFERENCES workout_template_exercises(id),
  exercise_id uuid NOT NULL REFERENCES exercises(id),
  sets SMALLINT CHECK (sets >= 0),
  reps SMALLINT CHECK (reps >= 0),
  weight SMALLINT CHECK (weight >= 0),
  notes TEXT
);