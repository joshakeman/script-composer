package data

import (
	"database/sql"
	"errors"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func Connect() *sql.DB {
	connStr := "postgres://scriptcomposer:pass@localhost/scriptcomposer?sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	return db
}

func RunMigrations() error {
	for _, tableName := range Tables {
		if val, ok := DDLs[name]; ok {
			qry := GetCheckforTableQuery(infoSchema, tableSchema, tableName)
		} else {
			return errors.New(fmt.Sprintf("Expected to find table definition for %s but didn't", tableName))
		}
	}
}
