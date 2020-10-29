package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"website_serve/model"
)

func OrderList(c *gin.Context) {
	i := model.OrderList{}
	err, is := i.OList()
	if err != nil {
		fmt.Println(err)
		c.JSON(200, nil)
		return
	}
	c.JSON(200, is)
}
//
//func Admin(c *gin.Context) {
//	type Param struct {
//		Username string `json:"username"`
//		Password string `json:"password"`
//	}
//	var par Param
//	err := c.BindJSON(&par)
//	if err != nil {
//		fmt.Println(err.Error())
//		c.JSON(200, gin.H{
//			"message": "password error",
//		})
//	}
//	data, err := base64.StdEncoding.DecodeString(par.Password)
//	if err != nil {
//		fmt.Println(err.Error())
//		return
//	}
//	Password, err := Rsa.RsaDecrypt(data)
//
//	//对比数据库中账号密码 par.Username Password
//	i := model.Admin{}
//	err, is := i.Admin(par.Username, string(Password))
//	if err != nil {
//		fmt.Println(err)
//		c.JSON(200, nil)
//		return
//	}
//	//session := sessions.Default(c)
//	//if session.Get("token") != is[0].Token {
//	//	session.Set("token", is[0].Token)
//	//	session.Save()
//	//}
//	c.JSON(http.StatusOK, is)
//}
