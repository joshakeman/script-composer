package data

import (
	"database/sql"
	"errors"
	"fmt"
)

const (
	infoSchema  = "information_schema"
	tableSchema = "textplay"
	characters  = "characters"
	shows       = "shows"
	users       = "users"
)

var Tables = []string{characters, shows, users}

var DDLs = map[string]string{
	characters: fmt.Sprintf(`CREATE TABLE public."%s" (
		id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
		name varchar(500) NOT NULL,
		img_path varchar(2500) NULL,
		phone_number varchar(30) NULL
	);`, characters),
	shows: fmt.Sprintf(`CREATE TABLE public."%s" (
		id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
		title varchar(500) NOT NULL,
		img_path_square varchar(2500) NULL,
		img_path_landscape varchar(2500) NULL,
		start_date time with time zone NULL,
		versions varchar NULL
	);`, shows),
	users: fmt.Sprintf(`CREATE TABLE public."%s" (
		id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
		title varchar(500) NOT NULL,
		img_path_square varchar(2500) NULL,
		img_path_landscape varchar(2500) NULL,
		start_date time with time zone NULL
	);`, users),
}

var checkForTableSQL = `
SELECT EXISTS (
	SELECT FROM %s.tables
	WHERE  table_schema = '%s'
	AND    table_name   = '%s'
 );`

var CreateTableSchema = ` CREATE TABLE public.%s (
	column1 time with time zone NULL,
	versions varchar NULL
);
`
var checkForTableSchemaSQL = `
SELECT EXISTS (
	SELECT FROM information_schema.tables
	WHERE  table_schema = '%s'
 )`

func GetCheckforTableSchemaQuery(tableSchema string) string {
	return fmt.Sprintf(
		checkForTableSchemaSQL, tableSchema,
	)
}

func CreateTableSchemaQuery(tableSchema string) string {
	return fmt.Sprintf(
		CreateTableSchema, tableSchema,
	)
}

func GetCheckforTableQuery(infoSchema, tableSchema, tableName string) string {
	return fmt.Sprintf(
		checkForTableSQL, infoSchema, tableSchema, tableName,
	)
}

func RunMigrations(db *sql.DB) error {
	/* First check for table schema */
	qry := GetCheckforTableSchemaQuery(tableSchema)

	row := db.QueryRow(qry)
	if row.Err() != nil {
		return row.Err()
	}
	var p checkExists
	if p.Exists == false {
		fmt.Println("Schema doesn't exist")
		qry := CreateTableSchemaQuery(tableSchema)
		row := db.QueryRow(qry)
		if row.Err() != nil {
			return row.Err()
		}
	}

	for _, tableName := range Tables {
		if val, ok := DDLs[tableName]; ok {
			qry := GetCheckforTableQuery(infoSchema, tableSchema, tableName)

			row := db.QueryRow(qry)
			if row.Err() != nil {
				return row.Err()
			}
			var p checkExists
			row.Scan(&p)
			if p.Exists == false {
				fmt.Println("Table doesn't exist")
				qry := val
				row := db.QueryRow(qry)
				if row.Err() != nil {
					return row.Err()
				}
			}
		} else {
			return errors.New(fmt.Sprintf("Expected to find table definition for %s but didn't", tableName))
		}
	}
	return nil
}

type checkExists struct {
	Exists bool `json:"exists"`
}
