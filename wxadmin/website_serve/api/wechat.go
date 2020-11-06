package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"website_serve/service"
)

func GetWechatMenu(c *gin.Context) {
	var s service.WechatMenuService
	res := s.GetWechatMenu(c)
	c.JSON(http.StatusOK, res)
}

func SaveWechatMenu(c *gin.Context) {
	var s service.Button
	if err := c.ShouldBindJSON(&s); err == nil {
		res := s.SaveWechatMenu(c)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusOK, gin.H{
			"code":    20001,
			"message": "数据错误",
		})
	}
	//c.JSON(http.StatusOK, res)
}
