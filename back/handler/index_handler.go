package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetIndexHandler() gin.HandlerFunc {

	return func(c *gin.Context) {
		content := "<h1>Hello Vercel Functions!</h1>"
		c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(content))
	}
}
