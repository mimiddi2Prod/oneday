// 初始化数据库连接池
var db = require("./utils/dba");
db.Init()

// 初始化HTTP
var Koa = require('./Koa.js')
Koa.Init()

// 初始化易联云打单机api
var yly = require('./utils/yly.js')
yly.Init()

// 初始化获取rsa密钥
var privateKey = require("./utils/getPrivateKey");
privateKey.Init()