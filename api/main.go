package api

import (
	"log"
	"script-composer/data"
)

func main() {
	db := data.Connect()

	cr := data.NewShowRepo(db)

	shows, _ := cr.ListAll()
	log.Println(shows)
}
