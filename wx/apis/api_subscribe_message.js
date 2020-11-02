var db = require("./../utils/dba");
var wechatApi = require("./../utils/wechat_api")
var config = require("./../config/wxConfig")

exports.run = async function (params) {
    return new Promise(async function (resolve, reject) {
        let condition = [{key: 'appid', value: wechatApi.wxConfig.appid}]
        let row = await db.Select("message", "subscribe_message", condition, "", "sort")
		row = row.map(val=>{
			val.message = decodeURIComponent(val.message)
			return val
		})
        // let row = [
            // {
                // "message": 'HELLO 欢迎您来Jolly' +
                    // '\n这是一整栋独立而幽静的白色城堡' +
                    // '\n满足您对理想生活向往的“惬意”与“愉悦”' +
                    // '\n \n我们有' +
                    // '\nCafe+Brunch+Shop+Play+Photography' +
                    // '\n等多种分享方式为一体的全新综合美学空间' +
                    // '\n希望通过新旧交汇，给您时空碰撞的奇妙感受' +
                    // '\n一起探索，美好生活吧' +
                    // '\n \nEnjoy a nice day with Oneday'
            // },
            // {
                // "message": '如果正巧你在Jolly可以连接我们的无线网络' +
                    // '\n \n账户：oneday jolly2F/3F' +
                    // '\n密码：oneday830'
            // },
            // {
                // "message": 'Jolly8英寸ins简约日式蛋糕6.5折上线中，可前往大众点评下单抢购http://m.dianping.com/appshare/shop/k1k9t9HpNDlJop4A'
            // }
        // ]
        // todo 可在subscribe_message表中添加状态用于切换 是否文字还是图片
        if (row.length > 0) {
            let i = 0
            sendText(params, row, i);
        } else {
            sendImage(params)
        }
    })

};

function sendText(param, messages, index) {
    if (index < messages.length) {
        let message = messages[index].message
        wechatApi.api.sendText(param.openid, message, function (err, result) {
            if (result.errcode == 0) {
                sendText(param, messages, index + 1)
            }
        });
    } else {
        if (param.eventkey.length > 0) {
            sendMiniProgram(param)
        }
    }
}

function sendImage(param) {
    wechatApi.api.uploadMedia('./images/subscribe.jpg', 'image', function (err, result) {
        wechatApi.api.sendImage(param.openid, result.media_id, function (err, result) {
            if (result.errcode == 0) {
                if (param.eventkey.length > 0) {
                    sendMiniProgram(param)
                }
            }
        });
    });
}

function sendMiniProgram(param) {
    let expire_time = new Date().getTime() + (30 * 60 * 1000)
    let message = '<a data-miniprogram-appid="' + config.restaurant_mini_appid + '" data-miniprogram-path="pages/blank/blank?id=' + param.eventkey.split('_')[1] + '&expire_time=' + expire_time + '" href="">你选择了:' + param.eventkey.split('_')[1] + '桌，点击进入菜单</a>'
    wechatApi.api.sendText(param.openid, message, function (err, result) {
        if (result.errcode == 0) {

        }
    });
}
