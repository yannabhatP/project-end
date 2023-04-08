package db

import (
	"errors"
	"hemorrhage/api/auth/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getPersons() ([]model.Person, error) {
	query := "select person_id, gender, fname, lname, bdate from person"
	person := []model.Person{}
	err := db.Select(&person, query)
	if err != nil {
		return nil, err
	}
	return person, nil
}
func getPerson(id string) (*model.Person, error) {
	query := "select person_id, gender, fname, lname, bdate from person where person_id=?"
	person := model.Person{}
	err := db.Get(&person, query, id)
	if err != nil {

		return nil, err
	}
	return &person, nil
}

func addPerson(per model.Person) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	query := "insert into person (person_id, gender, fname, lname, bdate) value (?, ?, ?, ?, ?)"
	result, err := tx.Exec(query, per.Person_Id, per.Gender, per.Fname, per.Lname, per.Bdate)
	if err != nil {
		return err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		tx.Rollback()
		return err
	}
	if affected <= 0 {
		return errors.New("cannot insert into person")
	}
	err = tx.Commit()
	if err != nil {
		return err
	}
	return nil
}

func editPerson(per model.Person) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	query := "update person set gender=?, fname=?, lname=?, bdate=? where person_id=?"
	result, err := tx.Exec(query, per.Gender, per.Fname, per.Lname, per.Bdate, per.Person_Id)
	if err != nil {
		tx.Rollback()
		return err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if affected <= 0 {
		return errors.New("cannot update attraction")
	}
	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}
func removePerson(id string) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	query := "delete from person where person_id=?"
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
		return errors.New("cannot delete person")
	}
	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}

func GetPersons(c *gin.Context) {
	person, err := getPersons()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}

	c.JSON(http.StatusOK, person)
}

func GetPerson(c *gin.Context) {
	strId := c.Param("id")

	person, err := getPerson(strId)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}

	c.JSON(http.StatusOK, person)
}

func PostPerson(c *gin.Context) {
	var p model.Person
	if err := c.BindJSON(&p); err != nil {
		return
	}
	err := addPerson(p)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.IndentedJSON(http.StatusCreated, "Create Succeed")
}

func PutPerson(c *gin.Context) {
	var p model.Person
	if err := c.BindJSON(&p); err != nil {
		return
	}
	strId := c.Param("id")

	p.Person_Id = strId
	err := editPerson(p)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusOK, "Update Succeed")
}

func DeletePerson(c *gin.Context) {
	strId := c.Param("id")
	err := removePerson(strId)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusOK, "Delete Success")

}
