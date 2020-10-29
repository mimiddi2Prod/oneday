package mySession

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func SessionInit() gin.HandlerFunc {
	store := cookie.NewStore([]byte("LeechKing"))
	return sessions.Sessions("uuid", store)
}

//func SetCookie() {
//	st
//	sessions.Sessions("token", store)
//}

//func SessionInit() cookie.Store {
//	store := cookie.NewStore([]byte("LeechKing"))
//	sessions.Sessions("uuid", store)
//	//return sessions.Sessions("uuid", store)
//	return store
//}

func SetSession(c *gin.Context, key string, value string) {
	session := sessions.Default(c)
	session.Clear()
	session.Set(key, value)
	session.Save()
}
