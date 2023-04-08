package db

import (
	"hemorrhage/api/auth/model"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB

func setDriverInToModel() *model.DBDriver {

	dbConnect := model.DBDriver{Driver: os.Getenv("DRIVER_DB"), DBConnect: os.Getenv("DRIVER_DBCONNECTION")}
	return &dbConnect

}

func SetSecretIntoModel() *model.Secret {
	hmacSecret := model.Secret{}
	hmacSecret.Hmac = []byte(os.Getenv("JWT_SECRET_KEY"))
	return &hmacSecret
}

func ConnectDB() {
	var err error
	dbconnnect := setDriverInToModel()
	db, err = sqlx.Open(dbconnnect.Driver, dbconnnect.DBConnect)
	if err != nil {
		panic(err)
	}
}
