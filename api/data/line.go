package data

import (
	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
)

type Line struct {
	gorm.Model

	ShowId        uuid.UUID
	Version       int
	Hour          int
	Minute        int
	Content       string
	Vars          []string
	From          string
	Question      bool
	TimeoutAnswer string
	YesAnswer     string
	NoAnswer      string
	Day           int
	ImgUrl        string
}
