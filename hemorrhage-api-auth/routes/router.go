package routes

import (
	"hemorrhage/api/auth/db"
	"hemorrhage/api/auth/middleware"

	"github.com/gin-gonic/gin"
)

func checkAuth(router *gin.Engine) {
	check := router.Group("/")
	{
		check.GET(":email", db.FindAuthorization)
	}
}
func routeGroupUser(router * gin.Engine){
	user := router.Group("/u",middleware.JWTAuth())
	{
		user.GET("",db.GetUsers)
		user.GET("/:email",db.GetUser)
		user.POST("",db.PostUser)
		user.PUT("/:email",db.PutUser)
		user.DELETE("/:id",db.DeleteUser)
	}
}

func routeGroupPerson(router *gin.Engine) {
	person := router.Group("/p", middleware.JWTAuth())
	{
		person.GET("", db.GetPersons)
		person.GET("/:id", db.GetPerson)
		person.POST("", db.PostPerson)
		person.PUT("/:id", db.PutPerson)
		person.DELETE("/:id", db.DeletePerson)
	}
}
func routeGroupPhaseOne(router *gin.Engine) {
	phaseone := router.Group("/p1", middleware.JWTAuth())
	{
		phaseone.GET("", db.GetPhaseOnes)
		phaseone.GET("/:id", db.GetPhaseOne)
		phaseone.POST("", db.PostPhaseOne)
		phaseone.PUT("/:id", db.PutPhaseOne)
		phaseone.DELETE("/:id", db.DeletePhaseOne)
	}
}

func routeGroupPhaseTwo(router *gin.Engine) {
	phasetwo := router.Group("/p2", middleware.JWTAuth())
	{
		phasetwo.GET("", db.GetPhaseTwos)
		phasetwo.GET("/:id", db.GetPhaseTwo)
		phasetwo.POST("", db.PostPhaseTwo)
		phasetwo.PUT("/:id", db.PutPhaseTwo)
		phasetwo.DELETE("/:id", db.DeletePhasetwo)
	}
}
func routeGroupResult(router *gin.Engine) {
	result := router.Group("/r", middleware.JWTAuth())
	{
		result.GET("", db.GetResults)
		result.GET("/:id", db.GetResult)
		result.POST("", db.PostResult)
	}
}

func GroupRoute(router *gin.Engine) {
	checkAuth(router)
	routeGroupUser(router)
	routeGroupPerson(router)
	routeGroupPhaseOne(router)
	routeGroupPhaseTwo(router)
	routeGroupResult(router)
}
