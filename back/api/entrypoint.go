package api

import (
	"net/http"

	"github.com/atoyr/backyard/internal/handler"
	"github.com/gin-gonic/gin"
)

var (
	app *gin.Engine
)

func myRoute(r *gin.RouterGroup) {
	r.GET("/", handler.GetIndexHandler())
	r.GET("/todos", handler.GetTodosHandler())
}

func init() {
	app = gin.New()
	r := app.Group("/")
	myRoute(r)
}

func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}
