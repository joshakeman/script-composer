package data

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
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

func (s *ShowRepo) Create(sh Show) (int64, error) {
	stmt, err := s.db.Prepare(`
		INSERT INTO shows
		(title, subdomain, start_date, img_path_square, img_path_landscape, versions)
		VALUES($1, $2, $3, $4, $5, $6)
	`)
	if err != nil {
		return 0, err
	}

	res, err := stmt.Exec(
		sh.Title,
		sh.Subdomain,
		sh.StartDate,
		sh.ImgPathSquare,
		sh.ImgPathLandscape,
		sh.Versions,
	)
	if err != nil {
		return 0, err
	}

	ra, err := res.RowsAffected()
	if err != nil {
		return 0, err
	}

	return ra, nil
}

func (s *ShowRepo) ListAll() ([]Show, error) {
	rows, err := s.db.Query(`
	SELECT * FROM shows
	`)
	if err != nil {
		return []Show{}, err
	}

	var shows []Show

	for rows.Next() {
		var s Show
		err := rows.Scan(
			&s.ID,
			&s.Title,
			&s.ImgPathSquare,
			&s.ImgPathLandscape,
			&s.StartDate,
			&s.Versions,
			&s.Subdomain,
		)
		if err != nil {
			return []Show{}, err
		}
		shows = append(shows, s)
	}

	return shows, nil
}

type Show struct {
	gorm.Model

	UUID             uuid.UUID `json:"uuid"`
	Title            string    `json:"title"`
	Subdomain        string    `json:"subdomain"`
	StartDate        time.Time `json:"start_date"`
	ImgPathSquare    string    `json:"img_path_square"`
	ImgPathLandscape string    `json:"img_path_landscape"`
	Versions         string    `json:"versions"`
}
