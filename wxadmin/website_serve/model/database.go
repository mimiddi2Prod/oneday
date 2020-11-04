package model

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"time"
)

var (
	MysqlDb    *sql.DB
	MysqlDbErr error
)

//const (
//	USER_NAME = "root"
//	PASS_WORD = ""
//	HOST      = "127.0.0.1"
//	PORT      = "3306"
//	DATABASE  = "oneday_wechat"
//	CHARSET   = "utf8"
//)

func Database(dbDSN string) {
	//dbDSN := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=%s", USER_NAME, PASS_WORD, HOST, PORT, DATABASE, CHARSET)
	//打开连接失败
	MysqlDb, MysqlDbErr = sql.Open("mysql", dbDSN)
	if MysqlDbErr != nil {
		log.Println("dbDSN：" + dbDSN)
		panic("数据源配置不正确：" + MysqlDbErr.Error())
	}
	//最大连接数
	MysqlDb.SetMaxOpenConns(100)
	//闲置连接数
	MysqlDb.SetMaxIdleConns(20)
	//最大连接周期
	MysqlDb.SetConnMaxLifetime(100 * time.Second)

	if MysqlDbErr = MysqlDb.Ping(); MysqlDbErr != nil {
		panic("数据库连接失败：" + MysqlDbErr.Error())
	}
}
