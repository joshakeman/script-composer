package data

import "fmt"

const (
	infoSchema  = "public"
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

var checkForTableSQL = fmt.Sprintf(`
SELECT EXISTS (
	SELECT 1
	FROM   %s.tables 
	WHERE  table_schema = '%s'
	AND    table_name = '%s'
	);
`)

func GetCheckforTableQuery(infoSchema, tableSchema, tableName string) string {
	return fmt.Sprintf(
		checkForTableSQL, infoSchema, tableSchema, tableName,
	)
}
