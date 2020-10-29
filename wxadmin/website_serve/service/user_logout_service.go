package service

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func clearSession(c *gin.Context) {
	sess := sessions.Default(c)
	sess.Clear()
	sess.Save()
}

//用户登录
func Logout(c *gin.Context) map[string]interface{} {
	clearSession(c)
	return gin.H{
		"code":    20000,
		"message": "账号已登出",
	}
}
