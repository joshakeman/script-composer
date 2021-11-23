package main

import (
	"flag"
	"script-composer/data"
)

func main() {
	migrate := flag.Bool("migrate", false, "Run db migrations on startup")
	db := data.Connect()

	flag.Parse()

	if *migrate {
		data.GoMigrate(db)
	}
}
