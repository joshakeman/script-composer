package main

import (
	"log"
	"script-composer/data"
)

func main() {
	db := data.Connect()

	repo := data.NewCharacterRepo(db)

	err := repo.Create("Benedick", "b.png")
	if err != nil {
		log.Println(err)
	}
	chars := repo.ListAll()

	log.Println(chars)

}
