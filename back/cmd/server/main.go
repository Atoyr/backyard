package main

import (
	"log"

	"github.com/atoyr/backyard/api"
)

func main() {
	app := api.GetApp()

	// サーバー起動
	log.Println("backend listening on :8080")
	if err := app.Run(":8080"); err != nil {
		log.Fatal("server error:", err)
	}
}
