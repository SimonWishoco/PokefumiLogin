CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY,
  name	CHAR,
  password CHAR,
  score INTEGER DEFAULT 0
)
