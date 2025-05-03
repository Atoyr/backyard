package handler

import (
	"encoding/json"
	"net/http"

	"github.com/atoyr/backyard/internal/models"
)

func Todos(w http.ResponseWriter, r *http.Request) {
	todos := []models.Todo{
		{ID: 1, Title: "Todo 1"},
		{ID: 2, Title: "Todo 2"},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todos)
}
