package service

import (
	"encoding/base64"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"website_serve/model"
	"website_serve/rsa"
)

// UserLoginService 管理用户登录的服务
type UserLoginService struct {
	Username string `json:"username" form:"username" binding:"required,min=5,max=30"`
	Password string `json:"password" form:"password" binding:"required,min=8"`
}

// setSession 设置session
//func (service *UserLoginService) setSession(c *gin.Context, user model.User) {
//	s := sessions.Default(c)
//	s.Clear()
//	s.Set("user_id", user.ID)
//	s.Save()
//}
func setSession(c *gin.Context, user model.User, token string) {
	sess := sessions.Default(c)
	sess.Clear()
	sess.Set("user_id", user.Id)
	sess.Set("roles", user.UserName) // 账号权限，当前以账号 admin 和 editor 分，之后应对账号进行权限分类
	sess.Set("token", token)
	sess.Save()
}

//用户登录
func (s *UserLoginService) Login(c *gin.Context) map[string]interface{} {
	//返回base64编码的字符串s代表的数据。
	data, err := base64.StdEncoding.DecodeString(s.Password)
	if err != nil {
		//fmt.Println(err.Error())
		return gin.H{
			"code":    60002,
			"message": "编码错误，请联系管理员！",
		}
	}

	//对密码进行rsa解码
	Password, err := rsa.RsaDecrypt(data)
	//对比数据库中账号密码 s.Username Password
	i := model.User{}
	is, err := i.GetUser(s.Username, string(Password))
	if err != nil {
		return gin.H{
			"code":    60003,
			"message": "数据库异常",
		}
	} else if len(is) == 0 {
		return gin.H{
			"code":    20002,
			"message": "账号或密码错误",
		}
	}

	//生成uuid 设置token
	uid := uuid.New().String()
	//c.SetCookie("token", uid, 86400, "/", "localhost", false, true)
	setSession(c, is[0], uid)
	return gin.H{
		"code":    20000,
		"message": "登录成功",
		"data": gin.H{
			"token": uid,
		},
	}
}
