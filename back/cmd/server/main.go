package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Ginルーターの設定
	r := gin.Default()

	// サーバー起動
	log.Println("backend listening on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("server error:", err)
	}
}
