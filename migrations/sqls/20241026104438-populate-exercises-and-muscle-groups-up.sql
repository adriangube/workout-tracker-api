INSERT INTO muscle_groups (name)
VALUES
  ('Quadriceps'),
  ('Hamstrings'),
  ('Glutes'),
  ('Core'),
  ('Pectorals'),
  ('Deltoids'),
  ('Triceps'),
  ('Lats'),
  ('Biceps'),
  ('Lower Back'),
  ('Upper Back'),
  ('Upper Chest'),
  ('Obliques'),
  ('Shoulders');

INSERT INTO exercises (name, description)
VALUES
  ('Squat', 'A lower body exercise that involves bending the knees and hips while keeping the torso upright.'),
  ('Bench Press', 'A chest exercise where you push a weight away from your chest while lying on a bench.'),
  ('Deadlift', 'A full-body exercise where you lift a weight from the ground up to hip level with a straight back.'),
  ('Pull-Up', 'An upper body exercise where you pull yourself up until your chin is above a bar.'),
  ('Bicep Curl', 'An arm exercise involving lifting a weight by bending the elbow.'),
  ('Overhead Press', 'A shoulder exercise where you lift a weight overhead from shoulder level.'),
  ('Lunges', 'A lower body exercise where you step forward or backward, bending both knees to lower your hips.'),
  ('Lat Pulldown', 'An upper body exercise that simulates a pull-up by pulling a bar down to chest level.'),
  ('Plank', 'A core exercise where you hold a push-up position to engage the core.'),
  ('Russian Twist', 'A core exercise where you twist your torso while holding a weight, usually while seated.');

INSERT INTO exercise_muscle_groups (exercise_id, muscle_group_id)
VALUES
  ((SELECT id FROM exercises WHERE name = 'Squat'), (SELECT id FROM muscle_groups WHERE name = 'Quadriceps')),
  ((SELECT id FROM exercises WHERE name = 'Squat'), (SELECT id FROM muscle_groups WHERE name = 'Hamstrings')),
  ((SELECT id FROM exercises WHERE name = 'Squat'), (SELECT id FROM muscle_groups WHERE name = 'Glutes')),
  ((SELECT id FROM exercises WHERE name = 'Squat'), (SELECT id FROM muscle_groups WHERE name = 'Core')),

  ((SELECT id FROM exercises WHERE name = 'Bench Press'), (SELECT id FROM muscle_groups WHERE name = 'Pectorals')),
  ((SELECT id FROM exercises WHERE name = 'Bench Press'), (SELECT id FROM muscle_groups WHERE name = 'Deltoids')),
  ((SELECT id FROM exercises WHERE name = 'Bench Press'), (SELECT id FROM muscle_groups WHERE name = 'Triceps')),

  ((SELECT id FROM exercises WHERE name = 'Deadlift'), (SELECT id FROM muscle_groups WHERE name = 'Hamstrings')),
  ((SELECT id FROM exercises WHERE name = 'Deadlift'), (SELECT id FROM muscle_groups WHERE name = 'Glutes')),
  ((SELECT id FROM exercises WHERE name = 'Deadlift'), (SELECT id FROM muscle_groups WHERE name = 'Lower Back')),
  ((SELECT id FROM exercises WHERE name = 'Deadlift'), (SELECT id FROM muscle_groups WHERE name = 'Core')),

  ((SELECT id FROM exercises WHERE name = 'Pull-Up'), (SELECT id FROM muscle_groups WHERE name = 'Lats')),
  ((SELECT id FROM exercises WHERE name = 'Pull-Up'), (SELECT id FROM muscle_groups WHERE name = 'Biceps')),
  ((SELECT id FROM exercises WHERE name = 'Pull-Up'), (SELECT id FROM muscle_groups WHERE name = 'Upper Back')),
  ((SELECT id FROM exercises WHERE name = 'Pull-Up'), (SELECT id FROM muscle_groups WHERE name = 'Core')),

  ((SELECT id FROM exercises WHERE name = 'Bicep Curl'), (SELECT id FROM muscle_groups WHERE name = 'Biceps')),

  ((SELECT id FROM exercises WHERE name = 'Overhead Press'), (SELECT id FROM muscle_groups WHERE name = 'Deltoids')),
  ((SELECT id FROM exercises WHERE name = 'Overhead Press'), (SELECT id FROM muscle_groups WHERE name = 'Triceps')),
  ((SELECT id FROM exercises WHERE name = 'Overhead Press'), (SELECT id FROM muscle_groups WHERE name = 'Upper Chest')),
  ((SELECT id FROM exercises WHERE name = 'Overhead Press'), (SELECT id FROM muscle_groups WHERE name = 'Core')),

  ((SELECT id FROM exercises WHERE name = 'Lunges'), (SELECT id FROM muscle_groups WHERE name = 'Quadriceps')),
  ((SELECT id FROM exercises WHERE name = 'Lunges'), (SELECT id FROM muscle_groups WHERE name = 'Glutes')),
  ((SELECT id FROM exercises WHERE name = 'Lunges'), (SELECT id FROM muscle_groups WHERE name = 'Hamstrings')),
  ((SELECT id FROM exercises WHERE name = 'Lunges'), (SELECT id FROM muscle_groups WHERE name = 'Core')),

  ((SELECT id FROM exercises WHERE name = 'Lat Pulldown'), (SELECT id FROM muscle_groups WHERE name = 'Lats')),
  ((SELECT id FROM exercises WHERE name = 'Lat Pulldown'), (SELECT id FROM muscle_groups WHERE name = 'Biceps')),
  ((SELECT id FROM exercises WHERE name = 'Lat Pulldown'), (SELECT id FROM muscle_groups WHERE name = 'Upper Back')),

  ((SELECT id FROM exercises WHERE name = 'Plank'), (SELECT id FROM muscle_groups WHERE name = 'Core')),
  ((SELECT id FROM exercises WHERE name = 'Plank'), (SELECT id FROM muscle_groups WHERE name = 'Shoulders')),
  ((SELECT id FROM exercises WHERE name = 'Plank'), (SELECT id FROM muscle_groups WHERE name = 'Glutes')),

  ((SELECT id FROM exercises WHERE name = 'Russian Twist'), (SELECT id FROM muscle_groups WHERE name = 'Obliques')),
  ((SELECT id FROM exercises WHERE name = 'Russian Twist'), (SELECT id FROM muscle_groups WHERE name = 'Core'));
