CREATE TABLE IF NOT EXISTS workout_templates(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(250) NOT NULL UNIQUE,
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES users(id)
);