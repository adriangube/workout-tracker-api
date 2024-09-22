CREATE TABLE IF NOT EXISTS exercises (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(250) NOT NULL UNIQUE,
    description VARCHAR(250) NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
)