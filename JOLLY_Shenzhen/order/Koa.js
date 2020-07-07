var Cmd = require('./utils/cmd.js');
var fs = require('fs')
var path = require('path')
var koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const koaStatic = require('koa-static'); // 处理各种静态资源 图片、字体、样式表、脚本等
const session = require('koa-session')

function Koa() {
}

Koa.Init = function () {
    if (!Koa.app) {
        var server = require('./utils/server.js')
        var Server = new server

        Koa.app = new koa()

        /**
         * 配置session
         */
        Koa.app.keys = ['cat is so cute'];  /* cookie的签名 */
        const CONFIG = {
            key: 'CODE-GEASS', /* 默认的cookie签名 */
            maxAge: 24 * 60 * 60 * 1000,/* cookie的最大过期时间 */
            autoCommit: true, /** (boolean) automatically commit headers (default true) */
            overwrite: true, /** 无效属性 */
            httpOnly: true, /** (boolean) httpOnly or not (default true) */
            signed: true, /** 默认签名与否 */
            rolling: false, /** 每次请求强行设置cookie */
            renew: false, /** cookie快过期时自动重新设置*/
        };
        Koa.app.use(session(CONFIG, Koa.app));

        /** main */
        const main = async function (ctx, next) {
            // console.log(ctx.request.path + ':' + ctx.request.method);
            await next();
        }
        Koa.app.use(main);

        /** 判断加载页面和登录状态 */
        const page = async function (ctx, next) {
            if (ctx.request.header.accept && ctx.request.header.accept.indexOf("text/html") != -1) {
                let path = ctx.request.path
                if (path == "/") {
                    ctx.response.type = 'html';
                    ctx.response.body = fs.createReadStream('./web/html/index.html');
                } else {
                    // pathList 所能打开的网页列表，可改为从文件public_data.js中获取
                    const pathList = ["/test", "/home", "/settleaccounts", "/orderform", "/category", "/test-sidebar"]
                    if (pathList.indexOf(path) == -1) {
                        ctx.response.type = 'html';
                        ctx.response.body = fs.createReadStream('./web/html/404.html');
                    } else {
                        // let user_agent = ctx.request.header["user-agent"]
                        let token = ctx.cookies.get('token');
                        let check = check_login({
                            // link_user_agent: user_agent,
                            link_token: token
                        }, ctx.session.user)
                        if (check.ok) {
                            ctx.response.type = 'html';
                            // 当前加载页面
                            ctx.cookies.set('page', path.split("/")[1], {
                                expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                                httpOnly: false
                            });
                            ctx.response.body = fs.createReadStream('./web/html' + path + '.html');
                        } else {
                            ctx.response.type = 'html';
                            ctx.response.body = fs.createReadStream('./web/html/index.html');
                        }
                    }
                }
            }
            await next();
        }
        Koa.app.use(page);

        /** api接口，基本只使用post */
        router.get('/apis/:apiName', async (ctx, next) => {
            let apiName = ctx.params.apiName;
            ctx.response.body = apiName == "get_public_key" ? await Server.run(apiName) : ''
        });

        router.post('/apis/:apiName', async (ctx, next) => {
            let apiName = ctx.params.apiName;
            let params = ctx.request.body
            let user_agent = ctx.request.header["user-agent"]
            let token = ctx.cookies.get('token');
            params.user_agent = user_agent
            if (apiName == "sign_out" && ctx.session.user.token == token) {
                ctx.session.user = null
                ctx.cookies.set('token', null);
                ctx.cookies.set('page', null);
                ctx.cookies.set('sidebar', null);
                ctx.response.body = {
                    errcode: 0,
                    errmsg: "request success",
                    data: "sign out success"
                };
                return
            }
            if (apiName != "sign_in") {
                let check = check_login({
                    // link_user_agent: user_agent,
                    link_token: token
                }, ctx.session.user)
                if (check.ok) {
                    params.user = ctx.session.user
                    // debug 调试需要，方便查看传递过来的参数，上线需去掉
                    console.info(params)
                    ctx.response.body = await Server.run(apiName, params)
                } else {
                    // 重新登录
                    ctx.response.body = {
                        errmsg: 'reLaunch',
                        errcode: 10001
                    }
                }
            } else {
                let result = await Server.run(apiName, params)
                if (result.data.token) {
                    ctx.cookies.set('token', result.data.token);
                    // 当前加载页面
                    ctx.cookies.set('page', "home", {
                        expires: result.data.expires,
                        httpOnly: false
                    });
                    // 侧边栏 可根据权限给予
                    ctx.cookies.set('sidebar', encodeURIComponent(JSON.stringify(require('./web/data/sidebar/god.js').sidebar).replace(/%/g, '%25')), {
                        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                        httpOnly: false
                    });
                    ctx.session.user = result.data.user    //设置session
                    ctx.response.body = {
                        errcode: 0,
                        errmsg: "request success",
                        data: "sign in success"
                    };
                } else {
                    ctx.response.body = {
                        errcode: 0,
                        errmsg: "request success",
                        data: result.data.text
                    };
                }

            }
        });

        Koa.app.use(bodyParser());
        Koa.app.use(router.routes());
        Koa.app.use(koaStatic(path.join(__dirname, "web")));
        // 在端口监听:
        Koa.app.listen(Cmd.GetCmd("--port", 5463));
    }
}

/** 登录检测 */
function check_login(link_data, session_data) {
    // if (link_data.link_user_agent != session_data.user_agent) {
    //     return {msg: "登录设备不同"}
    // }
    if (!link_data.link_token || !session_data) {
        return {msg: "没有token"}
    }
    if (link_data.link_token != session_data.token) {
        return {msg: "token对不上"}
    }
    if (new Date() > session_data.expire_time) {
        return {msg: "登录状态已过期 24h"}
    }
    return {ok: true}
}

module.exports = Koa;