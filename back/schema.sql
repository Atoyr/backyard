CREATE TABLE tasks (
  id   BIGSERIAL PRIMARY KEY,
  title text      NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  done boolean   DEFAULT false
);
