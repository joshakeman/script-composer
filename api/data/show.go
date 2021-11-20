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

func (s *ShowRepo) Create(id int) (int64, error) {
	stmt, err := s.db.Prepare(`
		INSERT INTO shows
		(title, subdomain, start_date, img_path_square, img_path_landscape, versions)
		VALUES($1, $2, $3, $4, $5, $6)
	`)
	if err != nil {
		return 0, err
	}

	res, err := stmt.Exec(stmt)
	if err != nil {
		return 0, err
	}

	lastId, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return lastId, nil
}

type Show struct {
	ID               int       `json:"id"`
	Title            string    `json:"title"`
	Subdomain        string    `json:"subdomain"`
	StartDate        time.Time `json:"start_date"`
	ImgPathSquare    string    `json:"img_path_square"`
	ImgPathLandscape string    `json:"img_path_landscape"`
	Versions         string    `json:"versions"`
}
