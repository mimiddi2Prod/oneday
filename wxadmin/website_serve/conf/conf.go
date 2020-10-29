package conf

import (
	"github.com/joho/godotenv"
	"os"
	"website_serve/model"
)

func Init() {
	// 从本地读取环境变量
	godotenv.Load()

	// 连接数据库
	model.Database(os.Getenv("MYSQL_DSN"))
}
