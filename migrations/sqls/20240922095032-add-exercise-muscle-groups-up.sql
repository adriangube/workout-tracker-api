CREATE TABLE IF NOT EXISTS exercise_muscle_groups (
    exercise_id uuid NOT NULL REFERENCES exercises(id),
    muscle_group_id uuid NOT NULL REFERENCES muscle_groups(id),
    PRIMARY KEY (exercise_id, muscle_group_id)
)