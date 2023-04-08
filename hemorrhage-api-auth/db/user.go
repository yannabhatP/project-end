package db

import (
	"errors"
	"hemorrhage/api/auth/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func getUsers() ([]model.Auth, error) {
	query := "select id, fname, lname, email from customer"
	user := []model.Auth{}
	err := db.Select(&user, query)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func getUser(email string) (*model.Auth, error) {
	query := "select id, fname, lname, email from customer where email= ?"
	user := model.Auth{}
	err := db.Get(&user, query, email)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func addUser(us model.Auth) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}

	query := "insert into customer (id, fname, lname, email, type) value (?, ?, ?, ?, ?)"
	result, err := tx.Exec(query, us.Id, us.Fname, us.Lname, us.Email, us.AuthType)
	if err != nil {
		return err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		tx.Rollback()
		return err
	}
	if affected <= 0 {
		return errors.New("cannot insert into customer")
	}
	err = tx.Commit()
	if err != nil {
		return err
	}
	return nil
}

func editUser(us model.Auth) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	query := "update customer set fname = ?, lname = ?  where email = ?"
	result, err := tx.Exec(query, us.Fname, us.Lname, us.Email)
	if err != nil {
		tx.Rollback()
		return err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if affected <= 0 {
		return errors.New("Cannot update attraction")
	}
	err = tx.Commit()
	if err != nil {
		return err
	}
	return nil
}

func removeUser(id int) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	query := "delete from customer where id = ?"
	result, err := tx.Exec(query, id)
	if err != nil {
		return err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		tx.Rollback()
		return err
	}
	if affected <= 0 {
		return errors.New("Cannot delete Customer")
	}
	err = tx.Commit()
	if err != nil {
		return err
	}
	return nil
}

func GetUsers(c *gin.Context) {
	user, err := getUsers()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusOK, user)
}

func GetUser(c *gin.Context) {
	strEmail := c.Param("email")

	user, err := getUser(strEmail)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusOK, user)
}

func PostUser(c *gin.Context) {
	var us model.Auth
	if err := c.BindJSON(&us); err != nil {
		return
	}
	err := addUser(us)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.IndentedJSON(http.StatusCreated, "Create Succeed")
}

func PutUser(c *gin.Context) {
	var us model.Auth
	if err := c.BindJSON(&us); err != nil {
		return
	}
	strEmail := c.Param("email")
	us.Email = strEmail
	err := editUser(us)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusOK, "Update Succeed")
}

func DeleteUser(c *gin.Context) {
	strId := c.Param("id")
	intId, err := strconv.Atoi(strId)
	if err != nil {
		return
	}
	err = removeUser(intId)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusOK, "Delete Succeed")
}
