CREATE TABLE IF NOT EXISTS muscle_groups (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(250) NOT NULL UNIQUE,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
)