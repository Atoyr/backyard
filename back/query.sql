-- name: GetTask :one
SELECT * FROM tasks
WHERE id = $1 LIMIT 1;

-- name: ListTasks :many
SELECT * FROM tasks
ORDER BY title;

-- name: CreateTask :one
INSERT INTO tasks (
  title
) VALUES (
  $1
)
RETURNING *;

-- name: UpdateTask :exec
UPDATE tasks
  set title = $2
WHERE id = $1;

-- name: DeleteTask :exec
DELETE FROM tasks
WHERE id = $1;
