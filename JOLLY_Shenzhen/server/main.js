// 初始化数据库连接池
var db = require("./utils/dba");
db.Init()

// 初始化HTTP
var Koa = require('./Koa.js')
Koa.Init()