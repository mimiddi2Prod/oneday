package model

import (
	"fmt"
)

//可以选择的控制字段有三种：
// -：不要解析这个字段
// omitempty：当字段为空（默认值）时，不要解析这个字段。比如 false、0、nil、长度为 0 的 array，map，slice，string
// FieldName：当解析 json 的时候，使用这个名字
//type StudentWithOption struct {
//	StudentId      string //默认使用原定义中的值
//	StudentName    string `json:"sname"`           // 解析（encode/decode） 的时候，使用 `sname`，而不是 `Field`
//	StudentClass   string `json:"class,omitempty"` // 解析的时候使用 `class`，如果struct 中这个值为空，就忽略它
//	StudentTeacher string `json:"-"`               // 解析的时候忽略该字段。默认情况下会解析这个字段，因为它是大写字母开头的
//}
type OrderList struct {
	Id        int    `json:"id"`
	UserId    int    `json:"user_id"`
	OpenId    string `json:"open_id"`
	ItemId    int    `json:"item_id2"` // 根据 `json:"item_id2"` 替代数据库字段名
	GoodsName string `json:"goodsname"`
}

func (o *OrderList) OList() (err error, ols []OrderList) {
	list := []OrderList{}
	//查询所有订单数据
	row, err := MysqlDb.Query("SELECT id,user_id,open_id,item_id,goodsname FROM `order`")
	if err != nil {
		fmt.Println(err)
		return err, nil
	}
	//遍历写入
	for row.Next() {
		item := OrderList{}
		err = row.Scan(&item.Id, &item.UserId, &item.OpenId, &item.ItemId, &item.GoodsName)
		if err != nil {
			fmt.Println(err)
			return err, nil
		}
		list = append(list, item)
	}
	return nil, list
}
//
//type Admin struct {
//	Id          int    `json:"id"`
//	UserName    string `json:"username"`
//	PassWord    string `json:"password"`
//	//Token       string `json:"token"` // 根据 `json:"item_id2"` 替代数据库字段名
//	//TokenExpire string `json:"token_expire"`
//}
//
//func (a *Admin) GetAdmin(Username string, Password string) (err error, als []Admin) {
//	list := []Admin{}
//	row, err := MysqlDb.Query("SELECT id,username,password FROM `admin` WHERE username = ? AND password = ?", Username, Password)
//	if err != nil {
//		fmt.Println(err)
//		return err, nil
//	}
//	//遍历写入
//	for row.Next() {
//		item := Admin{}
//		err = row.Scan(&item.Id, &item.UserName, &item.PassWord)
//		if err != nil {
//			fmt.Println(err)
//			return err, nil
//		}
//		list = append(list, item)
//	}
//	return nil, list
//}
