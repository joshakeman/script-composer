package data

import (
	"database/sql"
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

type CharacterRepo struct {
	db *sql.DB
}

func NewCharacterRepo(db *sql.DB) *CharacterRepo {
	return &CharacterRepo{
		db: db,
	}
}

func (c *CharacterRepo) ListAll() []Character {
	var res []Character

	rows, err := c.db.Query("SELECT * FROM characters")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var ch Character
		err := rows.Scan(&ch.ID, &ch.Name, &ch.ImagePath, &ch.PhoneNumber)
		if err != nil {
			log.Fatal(err)
		}
		res = append(res, ch)
	}

	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	return res
}

func (c *CharacterRepo) Create(name, imgPath, phoneNumber string) error {
	stmt, err := c.db.Prepare(`INSERT INTO characters(name, img_path, phone_number) VALUES($1, $2, $3)`)
	if err != nil {
		log.Fatal(err)
	}

	res, err := stmt.Exec(name, imgPath, phoneNumber)
	if err != nil {
		log.Fatal(err)
	}
	rowCnt, err := res.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	log.Println(rowCnt)

	return nil
}

type Character struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	ImagePath   string `json:"img_path"`
	PhoneNumber string `json:"phone_number"`
}
