var wechatApi = require("./../utils/wechat_api")

exports.run = async function (params) {
    return new Promise(async function (resolve, reject) {
        let openid = params.openid
        let content = params.content
        let message = ''
        // if (typeof (Number(content)) == 'number' && content.length == 11) {
        //     // console.info(content)
        //     let getCustomer = require('./yinbao_get_customer')
        //     let callback = getCustomer(content)
        //     callback.then(function (eData) {
        //         // console.info(eData)
        //         if (eData.code == 0) {
        //             message = '当前余额为：' + eData.data.balance + '\n当前积分为：' + eData.data.point
        //             let message2 = '小程序正在研发审核中，完成后你的余额及积分信息将会同步上传，期待给您提供更好的服务。'
        //             sendCustomerText(openid, message, message2)
        //         } else {
        //             message = '没有查询到会员卡，请咨询前台工作人员确认是否有注册'
        //             sendCustomerText(openid, message)
        //         }
        //         let balance = eData.data
        //     })
        // } else {
        send(params)
        // }
    })
};


function send(param) {
    let content = param.content
    let openid = param.openid
    let message = ''
    let url = ''

    // 内容关键词 根据关键词回复响应内容
    let keyword = ['民宿', '住宿', '预定', '预订', '怎么订', '怎么定', '在哪里', '订房', '定房']
    let keyword2 = ['Wi-Fi', 'wifi', 'WIFI', 'WiFi']
    let flag = 0
    for (let i in keyword) {
        if (content.indexOf(keyword[i]) != -1) {
            flag = 1
        }
    }
    for (let i in keyword2) {
        if (content.indexOf(keyword2[i]) != -1) {
            flag = 2
        }
    }
    switch (flag) {
        case 1: {
            message = 'Hi  感谢遇见，Enjoy a nice day with oneday ：）'
            break;
        }
        case 2: {
            message = '欢迎来到oneday设计师民宿：）'
            break;
        }
        // case "item3_2":{
        // url = './images/join.jpg'
        // break;
        // }
        default:
            message = 'Hi  感谢遇见，Enjoy a nice day with oneday ：）'
            break;
    }
    if (message.length > 0) {
        sendText(openid, message, flag)
    }
    if (url.length > 0) {
        sendImage(url, openid)
    }
}

function sendText(openid, message, flag) {
    wechatApi.api.sendText(openid, message, function (err, result) {
        // console.info(result)
        if (result.errcode == 0) {
            if (flag == 0) {
                sendText(openid, '若需预定房间，请点击左下角“民宿预定”进入“公众号预定”噢：）')
            }
            if (flag == 1) {
                sendText(openid, '若需预定房间，请点击左下角“民宿预定”进入“公众号预定”噢：）')
            }
            if (flag == 2) {
                sendText(openid, 'Wi-Fi密码：oneday830')
            }

            // 自动回复
            // if (flag == '0_3') {
            //     sendText(openid, '点击   “XX店优惠订”  即可优惠价入住oneday民宿的设计型房间噢：）')
            // }
        }
    });
}

function sendImage(url, openid) {
    wechatApi.api.uploadMedia(url, 'image', function (err, result) {
        console.info(err)
        console.info(result)
        wechatApi.api.sendImage(openid, result.media_id, function (err, result) {
            console.info(result)
        });
    });
}

// 会员卡
function sendCustomerText(openid, message, message2) {
    wechatApi.api.sendText(openid, message, function (err, result) {
        // console.info(result)
        if (result.errcode == 0) {
            wechatApi.api.sendText(openid, message2, function (err, result) {
                // console.info(result)
                if (result.errcode == 0) {

                }
            });
        }
    });
}
