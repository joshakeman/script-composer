package main

import (
	"log"
	"script-composer/data"
)

func main() {
	db := data.Connect()

	cr := data.NewCharacterRepo(db)

	log.Println(cr.ListAll())
}
