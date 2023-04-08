package db

import (
	"errors"
	"hemorrhage/api/auth/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getPhaseOnes() ([]model.PhaseOne, error) {
	query := "select phInp, phInp1, gestation, parity, GA, phInp3, hemorrhage, hemorrhage1, hemorrhage1Yes, phInp4, weight, height, Hct, HxPPH, DM, PIH, hemorrhage3, hemorrhage4, hemorrhage4Yes, hemorrhage5, phInp6, hemorrhage6, hemorrhage7, hemorrhage8, phInp7 from phaseone"
	pOne := []model.PhaseOne{}
	err := db.Select(&pOne, query)
	if err != nil {
		return nil, err
	}
	return pOne, nil
}
func getPhaseOne(id string) (*model.PhaseOne, error) {
	query := "select phInp, phInp1, gestation, parity, GA, phInp3, hemorrhage, hemorrhage1, hemorrhage1Yes, phInp4, weight, height, Hct, HxPPH, DM, PIH, hemorrhage3, hemorrhage4, hemorrhage4Yes, hemorrhage5, phInp6, hemorrhage6, hemorrhage7, hemorrhage8, phInp7 from phaseone where person_id=?"
	pOne := model.PhaseOne{}
	err := db.Get(&pOne, query, id)
	if err != nil {
		return nil, err
	}
	return &pOne, nil
}
func addPhaseOne(p1 model.PhaseOne) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	query := "insert into phaseone (person_id, phInp, phInp1, gestation, parity, GA, phInp3, hemorrhage, hemorrhage1, hemorrhage1Yes, phInp4, weight, height, Hct, HxPPH, DM, PIH, hemorrhage3, hemorrhage4, hemorrhage4Yes, hemorrhage5, phInp6, hemorrhage6, hemorrhage7, hemorrhage8, phInp7) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
	result, err := tx.Exec(query, p1.Person_Id, p1.PI, p1.PI1, p1.Gestation, p1.Parity, p1.GA, p1.PI3, p1.Hhage, p1.Hhage1, p1.Hhage1Y, p1.PI4, p1.Weight, p1.Height, p1.Hct, p1.HxPPH, p1.DM, p1.PIH, p1.Hhage3, p1.Hhage4, p1.Hhage4Y, p1.Hhage5, p1.PI6, p1.Hhage6, p1.Hhage7, p1.Hhage8, p1.PI7)
	if err != nil {
		return err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		tx.Rollback()
		return err
	}
	if affected <= 0 {
		return errors.New("cannot insert into phaseone")
	}
	err = tx.Commit()
	if err != nil {
		return err
	}
	return nil
}

func editPhaseOne(p1 model.PhaseOne) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	query := "update phaseone set phInp=?, phInp1=?, gestation=?, parity=?, GA=?, phInp3=?, hemorrhage=?, hemorrhage1=?, hemorrhage1Yes=?, phInp4=?, weight=?, height=?, Hct=?, HxPPH=?, DM=?, PIH=?, hemorrhage3=?, hemorrhage4=?, hemorrhage4Yes=?, hemorrhage5=?, phInp6=?, hemorrhage6=?, hemorrhage7=?, hemorrhage8=?, phInp7=? where person_id=?"
	result, err := tx.Exec(query, p1.PI, p1.PI1, p1.Gestation, p1.Parity, p1.GA, p1.PI3, p1.Hhage, p1.Hhage1, p1.Hhage1Y, p1.PI4, p1.Weight, p1.Height, p1.Hct, p1.HxPPH, p1.DM, p1.PIH, p1.Hhage3, p1.Hhage4, p1.Hhage4Y, p1.Hhage5, p1.PI6, p1.Hhage6, p1.Hhage7, p1.Hhage8, p1.PI7, p1.Person_Id)
	if err != nil {
		tx.Rollback()
		return err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if affected <= 0 {
		return errors.New("cannot update phaseone")
	}
	err = tx.Commit()
	if err != nil {
		return err
	}
	return nil
}

func removePhaseOne(id string) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	query := "delete from phaseone where person_id=?"
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
func GetPhaseOnes(c *gin.Context) {
	pTwo, err := getPhaseOnes()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.IndentedJSON(http.StatusOK, pTwo)
}

func GetPhaseOne(c *gin.Context) {
	strId := c.Param("id")
	person, err := getPhaseOne(strId)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.IndentedJSON(http.StatusOK, person)
}

func PostPhaseOne(c *gin.Context) {
	var p1 model.PhaseOne
	if err := c.BindJSON(&p1); err != nil {
		return
	}
	err := addPhaseOne(p1)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.IndentedJSON(http.StatusCreated, "Create Succeed")
}

func PutPhaseOne(c *gin.Context) {
	var ph1 model.PhaseOne
	if err := c.BindJSON(&ph1); err != nil {
		return
	}
	strId := c.Param("id")
	ph1.Person_Id = strId
	err := editPhaseOne(ph1)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.IndentedJSON(http.StatusCreated, "Update Succeed")
}

func DeletePhaseOne(c *gin.Context) {
	strId := c.Param("id")
	err := removePhaseOne(strId)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusOK, "Delete Succeed")

}
