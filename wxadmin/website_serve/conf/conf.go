package conf

import (
	"github.com/joho/godotenv"
	"os"
	"website_serve/model"
)

func Init() {
	// 从本地读取环境变量 go build生成main.exe 要运行需要把.env放到同目录下
	godotenv.Load()

	// 连接数据库
	model.Database(os.Getenv("MYSQL_DSN"))
}
