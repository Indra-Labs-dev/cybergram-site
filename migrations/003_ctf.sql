-- Mini-CTF : classement volontaire (pseudo uniquement) et priorité d'envoi pour la liste d'attente.
CREATE TABLE IF NOT EXISTS ctf_leaderboard (
  seed TEXT PRIMARY KEY,
  pseudo TEXT NOT NULL CHECK (char_length(pseudo) BETWEEN 2 AND 20),
  score INTEGER NOT NULL,
  duration_s INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ctf_leaderboard_rank_idx ON ctf_leaderboard (score DESC, duration_s ASC);

ALTER TABLE launch_waitlist
  ADD COLUMN IF NOT EXISTS ctf_completed BOOLEAN NOT NULL DEFAULT FALSE;
