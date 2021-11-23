package data

import (
	"github.com/jinzhu/gorm"
)

func GoMigrate(db *gorm.DB) {
	db.AutoMigrate(Character{})
	db.AutoMigrate(Line{})
	db.AutoMigrate(Show{})
	db.AutoMigrate(User{})
}
