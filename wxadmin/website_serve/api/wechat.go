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
