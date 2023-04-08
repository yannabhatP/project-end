package db

import (
	"hemorrhage/api/auth/model"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-jwt/jwt"
)

func findAuthorizationByEmail(email string) (*model.Auth, error) {
	query := "select id, fname, lname, email, type from customer where email = ?"
	auth := model.Auth{}
	err := db.Get(&auth, query, email)
	if err != nil {
		return nil, err
	}
	return &auth, nil
}

func FindAuthorization(c *gin.Context) {
	email := c.Param("email")
	auth, err := findAuthorizationByEmail(email)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	hmacSampleSecret := SetSecretIntoModel().Hmac
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": auth.Id,
		"exp":    time.Now().Add(time.Hour * 10).Unix(),
	})
	tokenString, err := token.SignedString(hmacSampleSecret)

	c.IndentedJSON(http.StatusOK, gin.H{"data": auth, "token": tokenString})
}
