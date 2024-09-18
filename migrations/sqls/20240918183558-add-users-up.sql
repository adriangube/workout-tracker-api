/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);