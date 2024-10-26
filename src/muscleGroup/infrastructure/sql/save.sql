INSERT INTO muscle_groups(name)
VALUES($1)
RETURNING id,
  name