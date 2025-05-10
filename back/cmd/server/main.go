package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"github.com/atoyr/backyard/internal/handler"
)

func main() {
	// Ginルーターの設定
	r := gin.Default()

	// WebSocketエンドポイント
	r.GET("/", handler.GetIndexHandler())

	// サーバー起動
	log.Println("backend listening on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("server error:", err)
	}
}
