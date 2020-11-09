package main

import (
	"website_serve/conf"
	"website_serve/router"
)

func main() {
	// 读取配置文件并初始化
	conf.Init()

	// 创建路由
	r := router.NewRouter()
	r.Run(":12001")
}

//func HandleGetAllData(c *gin.Context) {
//	//log.Print("handle log")
//	body, _ := ioutil.ReadAll(c.Request.Body)
//	fmt.Println("---body/--- \r\n " + string(body))
//
//	fmt.Println("---header/--- \r\n")
//	for k, v := range c.Request.Header {
//		fmt.Println(k, v)
//	}
//	//fmt.Println("header \r\n",c.Request.Header)
//
//	c.JSON(200, gin.H{
//		"receive": "1024",
//	})
//}
