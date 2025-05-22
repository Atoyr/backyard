package models

type Task struct {
	ID        int64  `json:"id"`
	Title     string `json:"title"`
	CreatedAt string `json:"created_at"`
	Status    string `json:"status"`
}
