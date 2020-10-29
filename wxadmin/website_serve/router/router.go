package router

import (
	"github.com/gin-gonic/gin"
	"os"
	"website_serve/api"
	"website_serve/middleware"
)

func NewRouter() *gin.Engine {
	r := gin.Default()

	//中间件 顺序不能改
	r.Use(middleware.Session(os.Getenv("SESSION_SECRET")))
	r.Use(middleware.Cors())
	//r.Use(middleware.CurrentUser())

	//路由分组
	v1 := r.Group("/dev-api/v1") // 开发环境
	//v1 := r.Group("/prod-api/v1") // 生产环境
	{
		//用户登录部分
		v1.GET("/user/getPubKey", api.GetPubKey)
		v1.POST("/user/login", api.UserLogin)

		//需要登录验证的
		auth := v1.Group("")
		auth.Use(middleware.AuthRequired())
		user := auth.Group("/user")
		{
			user.GET("/info", api.GetUserInfo)
			user.POST("/logout", api.Logout)
		}

	}
	return r
}
