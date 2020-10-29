package middleware

import (
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
)

// CurrentUser 获取登录用户
func CurrentUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		uid := session.Get("user_id")
		//if uid != nil {
		//	user, err := model.GetUser(uid)
		//	if err == nil {
		//		c.Set("user", &user)
		//	}
		//}
		fmt.Println(uid)
		c.Next()
	}
}

// AuthRequired 需要登录
func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		if token, _ := c.Cookie("token"); token != "" {
			sess := sessions.Default(c)
			if token == sess.Get("token") {
				c.Next()
				return
			}
		}

		c.JSON(http.StatusOK, gin.H{
			"code": 20003,
			"message":  "验证失败",
		})
		c.Abort()
	}
}
