/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS workouts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    createdAt timestamp WITH TIME ZONE NOT NULL DEFAULT NOW(),
    user_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);