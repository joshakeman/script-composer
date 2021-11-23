package data

import (
	"log"

	_ "github.com/jinzhu/gorm/dialects/postgres"

	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
)

func Connect() *gorm.DB {
	dsn := "host=localhost port=5432 user=scriptcomposer dbname=scriptcomposer sslmode=disable password=scriptcomposer"
	db, err := gorm.Open("postgres", dsn)
	if err != nil {
		log.Fatal(err)
	}

	return db
}
