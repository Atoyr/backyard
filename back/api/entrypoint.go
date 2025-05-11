package api

import (
	"net/http"

	"github.com/atoyr/backyard/internal/handler"
	"github.com/gin-gonic/gin"
)

var app *gin.Engine

func init() {
	app = gin.New()
	app.GET("/", handler.GetIndexHandler())
}

func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}
