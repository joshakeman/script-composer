package data

import (
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
)

type ShowRepo struct {
	db *gorm.DB
}

func NewShowRepo(db *gorm.DB) *ShowRepo {
	return &ShowRepo{
		db: db,
	}
}

func (s *ShowRepo) GetByUUID(uuid uuid.UUID) (Show, error) {
	var show Show
	err := s.db.Where("uuid = ?", uuid).First(&show).Error
	if err != nil {
		return Show{}, err
	}

	return show, nil
}

func (s *ShowRepo) Create(sh Show) error {
	sh.UUID = uuid.New()
	res := s.db.Create(&sh)
	if res.Error != nil {
		return res.Error
	}

	log.Println("Rows affected: ", res.RowsAffected)
	return nil
}

func (s *ShowRepo) ListAll() ([]Show, error) {
	log.Println("Running list all shows")
	var shows []Show
	err := s.db.Find(&shows).Error
	if err != nil {
		return []Show{}, err
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
