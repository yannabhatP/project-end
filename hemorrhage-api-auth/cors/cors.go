package cors

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CorsConfig(r *gin.Engine) {
	allowedHeaders := "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization,X-CSRF-Token"
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3002", "http://eng.src.ku.ac.th:3002"}
	config.AllowHeaders = []string{allowedHeaders}
	r.Use(cors.New(config))
}
