package db

import (
	"errors"
	"hemorrhage/api/auth/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getPhaseTwos() ([]model.PhaseTwo, error) {
	query := "select hemorrhage, ph2inp, hemorrhage1, hemorrhage2, hemorrhage3, hemorrhage4 from phasetwo"
	pTwo := []model.PhaseTwo{}
	err := db.Select(&pTwo, query)
	if err != nil {
		return nil, err
	}
	return pTwo, nil
}

func getPhaseTwo(id string) (*model.PhaseTwo, error) {
	query := "select hemorrhage, ph2inp, hemorrhage1, hemorrhage2, hemorrhage3, hemorrhage4 from phasetwo where person_id=?"
	pTwo := model.PhaseTwo{}
	err := db.Get(&pTwo, query, id)
	if err != nil {
		return nil, err
	}
	return &pTwo, nil
}

func addPhaseTwo(p2 model.PhaseTwo) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	query := "insert into phasetwo (person_id, hemorrhage, ph2inp, hemorrhage1, hemorrhage2, hemorrhage3, hemorrhage4) value (?, ?, ?, ?, ?, ?, ?)"
	result, err := tx.Exec(query, p2.Person_Id, p2.Hhage, p2.P2I, p2.Hhage1, p2.Hhage2, p2.Hhage3, p2.Hhage4)
	if err != nil {
		return err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		tx.Rollback()
		return err
	}
	if affected <= 0 {
		return errors.New("cannot insert into phasetwo")
	}
	err = tx.Commit()
	if err != nil {
		return err
	}
	return nil
}

func editPhaseTwo(p2 model.PhaseTwo) error {

	tx, err := db.Begin()
	if err != nil {
		return err
	}

	query := "update phasetwo set hemorrhage=?, ph2inp=?, hemorrhage1=?, hemorrhage2=?, hemorrhage3=?, hemorrhage4=? where person_id=?"
	result, err := tx.Exec(query, p2.Hhage, p2.P2I, p2.Hhage1, p2.Hhage2, p2.Hhage3, p2.Hhage4, p2.Person_Id)
	if err != nil {
		tx.Rollback()
		return err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if affected <= 0 {
		return errors.New("cannot update phasetwo")
	}
	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}
func removePhaseTwo(id string) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	query := "delete from phasetwo where person_id=?"
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

func GetPhaseTwos(c *gin.Context) {
	pTwo, err := getPhaseTwos()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.IndentedJSON(http.StatusOK, pTwo)
}

func GetPhaseTwo(c *gin.Context) {
	strId := c.Param("id")

	person, err := getPhaseTwo(strId)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.IndentedJSON(http.StatusOK, person)
}

func PostPhaseTwo(c *gin.Context) {
	var ph2 model.PhaseTwo
	if err := c.BindJSON(&ph2); err != nil {
		return
	}
	err := addPhaseTwo(ph2)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.IndentedJSON(http.StatusCreated, "Create Succeed")
}

func PutPhaseTwo(c *gin.Context) {
	var ph2 model.PhaseTwo
	if err := c.BindJSON(&ph2); err != nil {
		return
	}
	strId := c.Param("id")
	ph2.Person_Id = strId
	err := editPhaseTwo(ph2)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.IndentedJSON(http.StatusOK, "Update Succeed")
}

func DeletePhasetwo(c *gin.Context) {
	strId := c.Param("id")
	err := removePhaseTwo(strId)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusOK, "Delete Succeed")

}
