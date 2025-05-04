package todos

import (
	"net/http"

	"github.com/atoyr/backyard/internal/handler"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		handler.Todos(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}
