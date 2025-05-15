package handler

import (
	"encoding/json"
	"net/http"
)

// Item は返却するデータの構造体です
type Item struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Price int    `json:"price"`
}

// データストア（実際のアプリケーションではデータベースを使用するでしょう）
var items = []Item{
	{ID: "1", Name: "コーヒー", Price: 350},
	{ID: "2", Name: "紅茶", Price: 400},
	{ID: "3", Name: "緑茶", Price: 300},
}

// すべてのアイテムを取得するハンドラー
func GetItemsHandler(w http.ResponseWriter, r *http.Request) {
	// メソッドがGETかどうかを確認
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// レスポンスヘッダーの設定
	w.Header().Set("Content-Type", "application/json")

	// JSONにエンコードしてレスポンスを返す
	if err := json.NewEncoder(w).Encode(items); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
