CREATE TABLE IF NOT EXISTS matches (
  match_id INTEGER PRIMARY KEY,
  player1 CHAR,
  player2 CHAR,
  player1deck INTEGER,
  player2deck INTEGER,
  status CHAR
)
