package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"website_serve/rsa"
)

func GetPubKey(c *gin.Context) {
	if err := rsa.GenerateKey(2048); err != nil {
		fmt.Println("密钥文件生成失败！")
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "server error",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"code": 20000,
		"data": gin.H{
			"pubKey": rsa.GetPublicKeyStr(),
		},
	})
}
