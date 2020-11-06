package service

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/url"
	"strconv"
	"strings"
	"website_serve/model"
)

//接收数组 如 [{"appid":"wx21cf2922d0a597b4","name":"oneday设计师民宿"}] 目前暂不需要
//type WechatMenuService struct {
//	Appid        string `json:"appid"`
//}
type WechatMenuService struct{}

type WechatInfo struct {
	Appid string `json:"appid"`
	Name  string `json:"name"`
}

func (s *WechatMenuService) GetWechatMenu(c *gin.Context) map[string]interface{} {
	var appidList [1](*WechatInfo)
	for i := range appidList {
		appidList[i] = &WechatInfo{"wx21cf2922d0a597b4", "oneday设计师民宿"}
	}
	i := model.WechatMenu{}
	is, err := i.GetWechatMenu(appidList)
	if err != nil {
		return gin.H{
			"code":    60003,
			"message": "数据库异常",
		}
	} else if len(is) == 0 {
		return gin.H{
			"code":    20000,
			"message": "没有找到菜单",
		}
	}

	return gin.H{
		"code": 20000,
		"data": is,
	}
}

type WechatMenuClick struct {
	Key     string `json:"key"`
	Image   string `json:"image"`
	Message string `json:"message"`
}

//Wechat 微信公众号菜单
type WechatMenu struct {
	Id               int    `json:"id"`
	Name             string `json:"name"`
	Parent_button_id int    `json:"parent_button_id"`
	Type             string `json:"type"`
	Url              string `json:"url"`
	Miniappid        string `json:"miniappid"`
	PagePath         string `json:"pagepath"`
	Sort             int    `json:"sort"`
	Appid            string `json:"appid"`
	Key              string `json:"key"`
	WechatMenuClick
}

type Button []struct {
	WechatMenu
	Sub_button []WechatMenu `json:"sub_button"`
}

func (s *Button) SaveWechatMenu(c *gin.Context) map[string]interface{} {
	//进行数据存储
	button := *s

	list := []WechatMenu{}
	sub_list := []WechatMenu{}

	for i := range button {
		//一级菜单
		list = append(list, WechatMenu{
			button[i].Id,
			button[i].Name,
			button[i].Parent_button_id,
			button[i].Type,
			button[i].Url,
			button[i].Miniappid,
			button[i].PagePath,
			i,
			button[i].Appid,
			"",
			WechatMenuClick{
				button[i].Key,
				button[i].Image,
				button[i].Message,
			},})
		//二级菜单
		for j := range button[i].Sub_button {
			button[i].Sub_button[j].Sort = j
			button[i].Sub_button[j].Parent_button_id = list[i].Id
			//message 转码
			if (len(button[i].Sub_button[j].Message) != 0) {
				button[i].Sub_button[j].Message = encodeURIComponent(button[i].Sub_button[j].Message)
			}
			if (len(button[i].Sub_button[j].Message) != 0 || len(button[i].Sub_button[j].Image) != 0) {
				button[i].Sub_button[j].Key = "item" + strconv.Itoa(i) + "_" + strconv.Itoa(j)
			}
			sub_list = append(sub_list, button[i].Sub_button[j])
		}
	}
	//将数据添加到数据库中
	//i := model.WechatMenu{}
	//err := i.SaveWechatMenu(list)
	//fmt.Println(223345455,err)

	//发送消息给公众号service 使其创建菜单
	//onedayonehome
	//res := ginS.GET("http://localhost:10001/apis/create_menu")
	//fmt.Println(res)

	return gin.H{
		"code": 20000,
		"data": s,
	}
}

//func typeof(v interface{}) string {
//	return fmt.Sprintf("%T", v)
//}

func encodeURIComponent(str string) string {
	r := url.QueryEscape(str)
	r = strings.Replace(r, "+", "%20", -1)
	return r
}
