package service

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

type UserInfo struct {
	Roles        []string `json:"roles"`
	Introduction string   `json:"introduction"`
	Avatar       string   `json:"avatar"`
	Name         string   `json:"name"`
}

//func strustToMap(structData *UserInfo) map[string]interface{} {
//	m := make(map[string]interface{})
//	//struct 转json
//	jsonBytes, _ := json.Marshal(structData)
//	//json 转map
//	json.Unmarshal(jsonBytes, &m)
//	return m
//}
func getSession(c *gin.Context) interface{} {
	sess := sessions.Default(c)
	roles := sess.Get("roles")
	return roles
}

func admin() *UserInfo {
	a := UserInfo{
		Roles:        []string{"admin"},
		Introduction: "I am a super administrator",
		Avatar:       "https: //wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
		Name:         "Super Admin",
	}
	return &a
}

func editor() *UserInfo {
	e := UserInfo{
		Roles:        []string{"editor"},
		Introduction: "I am an editor",
		Avatar:       "https: //wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
		Name:         "Normal Editor",
	}
	return &e
}

//用户登录
func GetInfo(c *gin.Context) map[string]interface{} {
	//暂不做权限处理，默认都是admin
	roles := getSession(c)
	var info *UserInfo
	switch roles {
	case "admin":
		info = admin()
	case "editor":
		info = editor()
	}
	return gin.H{
		"code": 20000,
		"data": info,
	}
}
