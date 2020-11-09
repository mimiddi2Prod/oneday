package model

import (
	"fmt"
	"os"
	"reflect"
)

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

//appidList []struct{}
func (w *WechatMenu) GetWechatMenu(arr interface{}) (btn Button, err error) {
	//todo 不知道把 interface 转 数组里面嵌 obj
	//fmt.Println(arr, 222)
	//appidList := arr.([]struct{}) //通过断言实现类型转换
	//appid := [1]Appid{}
	//for i,v := range appidList {
	//	fmt.Println(i,v)
	//	//appid[i] =
	//}
	//获取 menu_click表数据
	click := []WechatMenuClick{}
	row, err := MysqlDb.Query("SELECT `key`,image,message FROM `menu_click` WHERE appid = ? order by sort", os.Getenv("WECHAT"))
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	//遍历写入
	for row.Next() {
		item := WechatMenuClick{}
		err = row.Scan(&item.Key, &item.Image, &item.Message)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		click = append(click, item)
	}
	//将 menu_click表数据 添加到对应的菜单中

	//list：一级菜单 subList：二级菜单
	list := []WechatMenu{}
	sub_button := []WechatMenu{}
	row, err = MysqlDb.Query("SELECT * FROM `menu` WHERE appid = ? order by sort", os.Getenv("WECHAT"))
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	//遍历写入
	for row.Next() {
		item := WechatMenu{}
		err = row.Scan(&item.Id, &item.Name, &item.Parent_button_id, &item.Type, &item.Key, &item.Url, &item.Miniappid, &item.PagePath, &item.Sort, &item.Appid)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		//fmt.Println(item)
		if item.Key != "" {
			for i := range click {
				if item.Key == click[i].Key {
					item.Image = click[i].Image
					item.Message = click[i].Message
				}
			}
		}
		//对数据进行分组 list：一级菜单 subList：二级菜单
		if item.Parent_button_id == 0 {
			list = append(list, item)
		} else if item.Parent_button_id != 0 {
			sub_button = append(sub_button, item)
		}
	}

	//二级菜单分到对应的一级菜单
	button := Button{}
	for i := range list {
		temp := []WechatMenu{}
		button = append(button, struct {
			WechatMenu
			Sub_button []WechatMenu `json:"sub_button"`
		}{WechatMenu: list[i], Sub_button: temp})

		for j := range sub_button {
			if list[i].Id == sub_button[j].Parent_button_id {
				temp = append(temp, sub_button[j])
			}
		}
		button[i].Sub_button = temp
	}
	return button, nil
}

//存数据
func (w *WechatMenu) SaveWechatMenu(list interface{}) (err error) {
	if reflect.TypeOf(list).Kind() == reflect.Slice {
		s := reflect.ValueOf(list)
		MysqlDb.Query("DELETE FROM `menu` WHERE appid = ?", s.Index(0).Interface().(WechatMenu).Appid)
		MysqlDb.Query("DELETE FROM `menu_click` WHERE appid = ?", s.Index(0).Interface().(WechatMenu).Appid)
		for i := 0; i < s.Len(); i++ {
			ele := s.Index(i)
			v := ele.Interface().(WechatMenu)
			row, err := MysqlDb.Query("INSERT INTO `menu`(`name`,parent_button_id,`type`,`key`,url,miniappid,pagepath,sort,appid) VALUES (?,?,?,?,?,?,?,?,?)", v.Name, v.Parent_button_id, v.Type, v.Key, v.Url, v.Miniappid, v.PagePath, v.Sort, v.Appid)
			fmt.Println(row, err)

			if v.Key != "" {
				row, err = MysqlDb.Query("INSERT INTO `menu_click`(`key`,image,message,appid) VALUES (?,?,?,?)", v.Key, v.Image, v.Message, v.Appid)
			}
		}
	}

	return nil
}
