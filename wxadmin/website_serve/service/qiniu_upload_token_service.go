package service

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/qiniu/api.v7/v7/auth"
	"github.com/qiniu/api.v7/v7/storage"
	"os"
)

type QiniuUploadTokenService struct {
	Token string `json:"token"`
	Key   string `json:"key"` // 覆盖上传凭证需要
}

func (s *QiniuUploadTokenService) GetQiniuUploadToken(c *gin.Context) map[string]interface{} {
	accessKey := os.Getenv("QINIU_ACCESS_KEY")
	secretKey := os.Getenv("QINIU_SECRET_KEY")
	bucket := os.Getenv("QINIU_BUCKET")
	rootUrl := os.Getenv("QINIU_ROOT_URL")

	mac := auth.New(accessKey, secretKey)
	//// 简单上传凭证
	//putPolicy := storage.PutPolicy{
	//	Scope: bucket,
	//}
	//upToken := putPolicy.UploadToken(mac)
	//
	//return gin.H{
	//	"code": 20000,
	//	"data": gin.H{
	//		"token":   upToken,
	//		"rootUrl": rootUrl,
	//	},
	//}

	//覆盖上传凭证
	keyToOverwrite := s.Key
	putPolicy := storage.PutPolicy{
		Scope: fmt.Sprintf("%s:%s", bucket, keyToOverwrite),
	}

	putPolicy.Expires = 7200 //示例2小时有效期
	upToken := putPolicy.UploadToken(mac)

	info := QiniuUploadTokenService{
		upToken,
		s.Key,
	}

	return gin.H{
		"code": 20000,
		"data": gin.H{
			"qiniuDataObj": info,
			"imgUrl":       rootUrl + s.Key,
		},
	}
}

//index：图片目录 tag：图片作用的平台
//func GetKey(index int, tag string) string {
//	now := time.Now()
//	year, month, day := now.Date()
//	hour, min, sec := now.Clock()
//	//要对month进行转化 month 是 type Month
//	var m time.Month
//	m = month
//	i := int(m)
//
//	//key拼接
//	key := strconv.Itoa(year) +
//		strconv.Itoa(i) +
//		strconv.Itoa(day) +
//		strconv.Itoa(hour) +
//		strconv.Itoa(min) +
//		strconv.Itoa(sec) +
//		"_" + strconv.Itoa(index) +
//		"_" + tag
//	return key
//}
