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
		data.GoMigrate(db)
	}

	sr := data.NewShowRepo(db)

	// err := sr.Create(data.Show{
	// 	Title:     "Fake Show Title",
	// 	Subdomain: "dfd",
	// })
	// if err != nil {
	// 	log.Println(err)
	// }

	shows, err := sr.ListAll()
	if err != nil {
		log.Println(err)
	}
	log.Println(shows)
}
