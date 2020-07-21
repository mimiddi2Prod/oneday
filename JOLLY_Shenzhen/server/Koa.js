var Cmd = require('./utils/cmd.js');
// var fs = require('fs')
var path = require('path')
var koa = require('koa');
const xmlParser = require('koa-xml-body')
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const koaStatic = require('koa-static'); // 处理各种静态资源 图片、字体、样式表、脚本等

function Koa() {
}

Koa.Init = function () {
    if (!Koa.app) {
        var server = require('./utils/server.js')
        var Server = new server

        Koa.app = new koa()

        const main = async function (ctx, next) {
            console.log(ctx.request.path + ':' + ctx.request.method);
            await next();
        }
        Koa.app.use(main);

        // api接口处理 小程序不处理get请求
        // router.get('/apis/:apiName', async (ctx, next) => {
        //     let apiName = ctx.params.apiName;
        //     let params = ctx.query
        //     let user_agent = ctx.request.header["user-agent"]
        //     params.user_agent = user_agent
        //     if (params.RequestType == "mini~niconiconi~program") {
        //         // 是微信小程序请求
        //         // todo get处理
        //         ctx.response.body = await Server.run(apiName, params)
        //     } else {
        //         ctx.response.body = 'S~H~I~T~';
        //     }
        // });
        router.get('/apis/:apiName', async (ctx, next) => {
            ctx.response.body = 'S~H~I~T~';
        });

        router.post('/apis/:apiName', async (ctx, next) => {
            let apiName = ctx.params.apiName;
            let params = ctx.request.body
            // 判断是否是微信小程序请求
            if (apiName == "wxPayNotify") {
                // 返回xml格式
                ctx.response.body = await Server.run(apiName, params)
            } else if (params.RequestType == "mini~niconiconi~program") {
                let user_agent = ctx.request.header["user-agent"]
                params.user_agent = user_agent
                // 非get_openid需要做登录验证
                if (apiName == "get_openid") {
                    // debug 调试需要，方便查看传递过来的参数，上线需去掉
                    // console.info(params)
                    // todo post处理
                    ctx.response.body = await Server.run(apiName, params)
                } else {
                    let check = require("./utils/check_login_status")
                    let isLogin = await check.check_login_status(params["token"], params["user_agent"])
                    // console.info(isLogin)
                    if (isLogin.errcode == 10000) {
                        params.openid = isLogin.openid
                        // debug 调试需要，方便查看传递过来的参数，上线需去掉
                        // console.info(params)
                        ctx.response.body = await Server.run(apiName, params)
                    } else {
                        // 重新登录
                        ctx.response.body = {
                            errmsg: 'reLaunch',
                            errcode: 10001
                        }
                    }
                }
            } else {
                ctx.response.body = 'S~H~I~T~';
            }
        });

        router.get('/', async (ctx, next) => {
            ctx.response.body = '<h1>Index</h1>';
        });

        Koa.app.use(xmlParser())
        Koa.app.use(bodyParser());
        Koa.app.use(router.routes());
        Koa.app.use(koaStatic(path.join(__dirname)));
        // 在端口监听:
        Koa.app.listen(Cmd.GetCmd("--port", 5463));
    }
}

module.exports = Koa;