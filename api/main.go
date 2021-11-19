package api

import (
	"log"
	"script-composer/data"
)

func main() {
	db := data.Connect()

	repo := data.NewCharacterRepo(db)

	err := repo.Create("Benedick", "b.png", "+15554444")
	if err != nil {
		log.Println(err)
	}
	chars := repo.ListAll()

	log.Println(chars)
}
