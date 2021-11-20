package api

import (
	"fmt"
	"script-composer/data"
)

func main() {
	db := data.Connect()

	cr := data.NewCharacterRepo(db)

	fmt.Println(cr.ListAll())
}
