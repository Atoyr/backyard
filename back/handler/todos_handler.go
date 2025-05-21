package handler

import (
	"net/http"

	"github.com/atoyr/backyard/models"
	"github.com/gin-gonic/gin"
)

func GetTodosHandler() gin.HandlerFunc {
	return func(c *gin.Context) {

		todos := []models.Task{
			{ID: 1, Title: "Todo 1"},
			{ID: 2, Title: "Todo 2"},
		}

		c.JSON(http.StatusOK, todos)
	}
}
