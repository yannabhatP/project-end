package main

import (
	"hemorrhage/api/auth/cors"
	"hemorrhage/api/auth/db"
	"hemorrhage/api/auth/routes"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func loadDotENV() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	loadDotENV()
	db.ConnectDB()
	router := gin.Default()
	router.SetTrustedProxies([]string{"192.168.1.2", "eng.src.ku.ac.th"})
	cors.CorsConfig(router)
	routes.GroupRoute(router)
	router.Run(":4003")
}
