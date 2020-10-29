package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"website_serve/service"
)

func UserLogin(c *gin.Context) {
	var s service.UserLoginService
	if err := c.ShouldBindJSON(&s); err == nil {
		res := s.Login(c)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusOK, gin.H{
			"code":    20001,
			"message": "账号或密码不能为空",
		})
	}
}

func GetUserInfo(c *gin.Context) {
	if c.Query("token") != "" {
		//暂不做权限处理，默认都是admin
		res := service.GetInfo(c)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusOK, gin.H{
			"code":    20004,
			"message": "token不能为空",
		})
	}
}

func Logout(c *gin.Context) {
	//暂不做权限处理，默认都是admin
	res := service.Logout(c)
	c.JSON(http.StatusOK, res)
}
