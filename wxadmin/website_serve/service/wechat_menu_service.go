package service

import (
	"github.com/gin-gonic/gin"
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
