package data

import (
	"database/sql"
	"time"
)

type UserRepo struct {
	db *sql.DB
}

func NewUserRepo(db *sql.DB) UserRepo {
	return UserRepo{
		db: db,
	}
}

func (*UserRepo) GetByID(id int) {

}

type User struct {
	ID        int       `json:"id"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     time.Time `json:"email"`
}
