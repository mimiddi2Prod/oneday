package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"website_serve/service"
)

// 七牛云上传图片前，需要先获取token
// 获取token所需材料：key：key自己生成 用于做上传图片的名称，文件在浏览器中的临时路径 tempFilePath
func GetQiniuUploadToken(c *gin.Context) {
	var s service.QiniuUploadTokenService
	//post
	if err := c.ShouldBindJSON(&s); err == nil {
		res := s.GetQiniuUploadToken(c)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusOK, gin.H{
			"code":    20001,
			"message": "七牛key不存在",
		})
	}

	////get
	//res := s.GetQiniuUploadToken(c)
	//c.JSON(http.StatusOK, res)
}
