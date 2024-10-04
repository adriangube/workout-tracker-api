CREATE TABLE IF NOT EXISTS workout_template_exercises(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sets SMALLINT CHECK (sets >= 0),
  reps SMALLINT CHECK (reps >= 0),
  weight SMALLINT CHECK (weight >= 0),
  template_id uuid NOT NULL REFERENCES workout_templates(id),
  exercise_id uuid NOT NULL REFERENCES exercises(id)
);
