package api

import (
	"net/http"

	"github.com/atoyr/backyard/handler"
	"github.com/gin-gonic/gin"
)

var app *gin.Engine

func init() {
	app = gin.New()
	app.GET("/", handler.GetIndexHandler())
	app.GET("/todos", handler.GetTodosHandler())
	app.GET("/admin", func(c *gin.Context) {
		c.String(http.StatusOK, "Hello from golang in vercel")
	})
}

func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}

func GetApp() *gin.Engine {
	return app
}
