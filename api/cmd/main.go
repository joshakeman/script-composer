package main

import (
	"log"
	"script-composer/data"
)

func main() {
	db := data.Connect()

	cr := data.NewShowRepo(db)

	shows, err := cr.ListAll()
	if err != nil {
		log.Fatal(err)
	}
	log.Println(shows)
}
