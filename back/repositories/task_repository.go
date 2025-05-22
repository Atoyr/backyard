package repositories

import (
	"context"

	"github.com/atoyr/backyard/db"
	"github.com/atoyr/backyard/models"
	"github.com/jackc/pgx/v5"
)

type TaskRepository interface {
	GetAllTasks() ([]models.Task, error)
	CreateTask(title string) (models.Task, error)
	UpdateTask(id int64, title string) (models.Task, error)
	DeleteTask(id int64) (models.Task, error)
}

type dbTaskRepository struct {
	conn *pgx.Conn
}

func NewTaskRepository(conn *pgx.Conn) TaskRepository {
	return &dbTaskRepository{conn: conn}
}

func (d *dbTaskRepository) GetAllTasks() ([]models.Task, error) {
	q := db.New(d.conn)
	ctx := context.Background()
	dbTasks, err := q.ListTasks(ctx)
	if err != nil {
		return nil, err
	}

	var tasks []models.Task
	for _, dbTask := range dbTasks {
		task := models.Task{
			ID:    dbTask.ID,
			Title: dbTask.Title,
			// Add other fields as necessary
		}
		tasks = append(tasks, task)
	}

	return tasks, nil
}

func (d *dbTaskRepository) CreateTask(title string) (models.Task, error) {
	panic("not implemented")
}

func (d *dbTaskRepository) UpdateTask(id int64, title string) (models.Task, error) {
	panic("not implemented")
}

func (d *dbTaskRepository) DeleteTask(id int64) (models.Task, error) {
	panic("not implemented")
}
