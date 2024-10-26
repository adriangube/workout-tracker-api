INSERT INTO exercises(name, description)
VALUES($1, $2)
RETURNING id,
  name,
  description