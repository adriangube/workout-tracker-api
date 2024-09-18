/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS exercises (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    image VARCHAR(255),
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    workout_id uuid NOT NULL,
    FOREIGN KEY (workout_id) REFERENCES workouts(id)
);
