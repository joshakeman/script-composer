package data

import (
	"database/sql"
	"time"

	"github.com/jinzhu/gorm"
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
	gorm.Model

	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     time.Time `json:"email"`
}
