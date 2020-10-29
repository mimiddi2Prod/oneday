package model

import "fmt"

//User 用户
type User struct {
	Id       int    `json:"id"`
	UserName string `json:"username"`
	PassWord string `json:"password"`
}

func (u *User) GetUser(Username string, Password string) (user []User, err error) {
	list := []User{}
	row, err := MysqlDb.Query("SELECT id,username,password FROM `admin` WHERE username = ? AND password = ?", Username, Password)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	//遍历写入
	for row.Next() {
		item := User{}
		err = row.Scan(&item.Id, &item.UserName, &item.PassWord)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		list = append(list, item)
	}
	return list, nil
}
