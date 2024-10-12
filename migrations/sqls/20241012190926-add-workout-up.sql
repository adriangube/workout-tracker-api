CREATE TABLE IF NOT EXISTS workout(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  template_id uuid NOT NULL REFERENCES workout_templates(id),
  status VARCHAR(250) NOT NULL CHECK (status IN ('started', 'completed')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE
);