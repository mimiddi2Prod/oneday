var Cmd = require('./utils/cmd.js');
// var fs = require('fs')
var path = require('path')
var koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const koaStatic = require('koa-static'); // 处理各种静态资源 图片、字体、样式表、脚本等

var Url = require('url');
var XMLJS = require('xml2js');
var sha1 = require('js-sha1');
// const wxConfig = require('./config/wxConfig')

var Encrypt = require('./utils/crypto')

function Koa() {
}

/**
 * 只服务公众号发来的消息，处理完后返回
 *
 * 公众号服务器配置：消息加解密方式 => 明文模式，安全模式，兼容模式（包含前面两种）
 *
 * 对接收到的信息进行解密（安全模式），并将解密完的消息转发到不对外公开的后端服务
 * 对返回的数据进行发送
 * */
Koa.Init = function () {
    if (!Koa.app) {
        var server = require('./utils/server.js')
        var Server = new server

        /**临时使用 之后写编辑后台 则不需要*/
        // setTimeout(()=>{
        //     createMenu()
        // },2000)
        function createMenu() {
            Server.run('create_menu', "")
        }

        // setTimeout(()=>{
        //     createLimitQRCode()
        // },2000)
        function createLimitQRCode() {
            Server.run('create_limit_qr_code', "")
        }

        Koa.app = new koa()

        Koa.app.use(async (ctx, next) => {
            // console.log(ctx.request.path + ':' + ctx.request.method);
            await next();
        });

        router.get('/apis/:apiName', async (ctx, next) => {
            let apiName = ctx.params.apiName;
            let params = ctx.query
            // todo get处理
            ctx.response.body = await Server.run(apiName, params)
        });

        router.post('/apis/:apiName', async (ctx, next) => {
            let apiName = ctx.params.apiName;
            let params = ctx.request.body
            // todo post处理
            ctx.response.body = await Server.run(apiName, params)
        });

        const main = async function (ctx, next) {
            const params = Url.parse(ctx.req.url, true).query;
            const openid = params.openid
            // 微信传来的加密字符串
            const signature = params.signature;
            // 根据传来的其他值计算加密字符串
            const timestamp = params.timestamp;
            const nonce = params.nonce;
            const wxConfig = require("./utils/wechat_api").wxConfig
            const token = wxConfig.token; // 这是在公众平台上自己设置的
            const array = [token, timestamp, nonce];
            array.sort();
            const scyptoString = sha1(array.join(''));

            // 比对两个加密字符串是否相等，相等则为微信官方传来的信息
            if (scyptoString === signature) {
                // 获取请求内的xml参数
                ctx.req.on('data', data => {
                    XMLJS.parseString(data.toString(), async (err, result) => {
                        if (result) {
                            let xml = null
                            /**
                             * 安全模式，即加密模式
                             * 对于安全模式的数据，需进行解密
                             * xml：
                             *  { xml:
                             *    { ToUserName: [ 'gh_7bce83e7f5ca' ],
                             *      FromUserName: [ 'od7YlwgDbeVGuYZO8Usdr2Eg0vZQ' ],
                             *      CreateTime: [ '1578719379' ],
                             *      MsgType: [ 'text' ],
                             *      Content: [ '21' ],
                             *      MsgId: [ '22601823981791055' ] } }
                             * */
                            if (result.xml.Encrypt) {
                                xml = (await Encrypt.DecodeAES(result.xml.Encrypt[0])).xml
                            } else {
                                xml = result.xml
                            }
                            /**
                             * 消息类型：event、text
                             *  event：包含subscribe(关注)、unsubscribe(取消关注)、SCAN(扫码进入)、CLICK(点击公众号菜单)
                             * text：用户在公众号内发送的消息
                             * */
                            const msgType = xml.MsgType[0]
                            let params = {}
                            if (msgType === 'event') {
                                const event = xml.Event[0];
                                if (event === 'subscribe') {
                                    // 订阅，获取用户基本信息存入订阅表，建议使用非同步写法以加快response
                                    params = {
                                        openid: openid,
                                        eventkey: xml.EventKey[0] // 扫描带参二维码并关注,否则为空
                                    }
                                    await Server.run('subscribe_message', params)
                                } else if (event === 'unsubscribe') {
                                    // 取消订阅
                                } else if (event === 'SCAN') {
                                    // 扫描二维码进入
                                    params = {
                                        openid: openid,
                                        eventkey: xml.EventKey[0] // 扫描带参二维码且已关注,否则为空
                                    }
                                    await Server.run('scan', params)
                                } else if (event === 'CLICK') {
                                    // 菜单栏点击进入
                                    params = {
                                        openid: openid,
                                        eventkey: xml.EventKey[0] // 点击菜单栏CLICK事件
                                    }
                                    await Server.run('click_menu', params)
                                }
                            } else if (msgType === 'text') {
                                params = {
                                    openid: openid,
                                    content: xml.Content[0]
                                }
                                await Server.run('reply', params)
                            }
                        }
                    })
                })
            }

            // 假如服务器无法保证在五秒内处理并回复，可以直接回复空串，微信服务器不会对此作任何处理，并且不会发起重试
            if (params.echostr) {
                /**
                 * 用于通过微信验证，对微信公众号后台配置进行回应
                 * */
                ctx.body = params.echostr;
            } else {
                ctx.body = '';
            }
        }
        // Koa.app.use(main);
        router.post('/', main)

        Koa.app.use(bodyParser());
        Koa.app.use(router.routes());
        Koa.app.use(koaStatic(path.join(__dirname)));
        // 在端口监听:
        Koa.app.listen(Cmd.GetCmd("--port", 5463));
    }
}

module.exports = Koa;
