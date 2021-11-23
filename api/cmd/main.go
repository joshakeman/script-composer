package main

import (
	"flag"
	"log"
	"script-composer/data"
)

func main() {
	migrate := flag.Bool("migrate", false, "Run db migrations on startup")
	db := data.Connect()

	flag.Parse()

	if *migrate {
		err := data.RunMigrations(db)
		log.Fatal(err)
	}

}
