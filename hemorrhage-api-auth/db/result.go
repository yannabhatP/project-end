package db

import (
	"errors"
	"hemorrhage/api/auth/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getResults() ([]model.Result,error){
	query := "select person_id, product, predict from result"
	result := []model.Result{}
	err := db.Select(&result,query)
	if err != nil {
		return nil,err
	}
	return result,nil
}

func getResult(id string)(*model.Result,error){
	query := "select person_id, product, predict from result where person_id=?"
	resu := model.Result{}
	err := db.Get(&resu,query,id)
	if err != nil {
		return nil,err
	}
	return &resu,nil
}

func addResult(r model.Result) error {
	tx,err := db.Begin()
	if err != nil {
		return err
	}
	query := "insert into result (person_id, product, predict) value (?,?,?)"
	result,err := tx.Exec(query,r.Person_Id,r.Product,r.Predict)
	if err != nil {
		return err
	}
	affected,err := result.RowsAffected()
	if err != nil {
		tx.Rollback()
		return err
	}
	if affected <= 0 {
		return errors.New("cannot insert into result")
	}
	err = tx.Commit()
	if err != nil {
		return err
	}
	return nil
}

func GetResults(c *gin.Context){
	result,err := getResults()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound,err)
		return
	}
	c.IndentedJSON(http.StatusOK,result)
}

func GetResult(c *gin.Context){
	strId := c.Param("id")
	result,err := getResult(strId)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound,err)
		return
	}
	c.IndentedJSON(http.StatusOK,result)
}

func PostResult(c *gin.Context){
	var r model.Result
	if err := c.BindJSON(&r); err != nil {
		return
	}
	err := addResult(r)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound,err)
		return
	}
	c.IndentedJSON(http.StatusCreated,"Create Succeed")
}