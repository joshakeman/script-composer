package main

import (
	"log"
	"script-composer/data"
)

func main() {
	db := data.Connect()
	err := data.RunMigrations(db)
	if err != nil {
		log.Fatal(err)
	}
}
