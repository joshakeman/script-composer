package data

import "database/sql"

type ShowRepo struct {
	db *sql.DB
}

func NewShowRepo(db *sql.DB) *ShowRepo {
	return &ShowRepo{
		db: db,
	}
}
