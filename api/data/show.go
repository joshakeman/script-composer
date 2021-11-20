package data

import (
	"database/sql"
	"time"
)

type ShowRepo struct {
	db *sql.DB
}

func NewShowRepo(db *sql.DB) *ShowRepo {
	return &ShowRepo{
		db: db,
	}
}

func (s *ShowRepo) GetByID(id int) {

}

type Show struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Subdomain string    `json:"subdomain"`
	StartDate time.Time `json:"start_date"`
}
