var db = require("./../utils/dba");
var wechatApi = require("./../utils/wechat_api")
var axios = require("axios")
var fs = require("fs")

exports.run = async function (params) {
    return new Promise(async function (resolve, reject) {
        await send(params)
    })

};

async function send(param) {
    const key = param.eventkey, openid = param.openid

    const condition = [{key: 'appid', value: wechatApi.wxConfig.appid}]
    const row = await db.Select("*", "menu_click", condition, "", "sort")
    const SendList = row.filter(val => {
        return val.key === key
    }).map(val => {
        return val.image ? {"image": val.image} : {"message": decodeURIComponent(val.message)}
    })

    // let message = ''
    // let url = ''
    // switch (key) {
    //     case "item1_1": {
    //         url = './images/item1_1.png'
    //         break;
    //     }
    //     case "item1_2": {
    //         url = './images/item1_2.png'
    //         break;
    //     }
    //     case "item1_3": {
    //         url = './images/item1_3.png'
    //         break;
    //     }
    //     case "item1_4": {
    //         url = './images/item1_4.png'
    //         break;
    //     }
    //     case "item1_5": {
    //         url = './images/item1_5.jpg'
    //         break;
    //     }
    //     case "item2_1": {
    //         message = '关于设计改造，可添加微信：sm278118152 或 tina7640 沟通：）'
    //         break;
    //     }
    //     case "item2_2": {
    //         // message = '关于民宿合作，可添加微信：sm278118152 或 tina7640 沟通：）'
    //         url = './images/item2_2.png'
    //         break;
    //     }
    //     case "item3_1": {
    //         url = './images/item3_1.png'
    //         break;
    //     }
    //     case "item3_4": {
    //         message = '简历邮箱：oneday830@163.com\n' +
    //             '服务投诉：oneday830@163.com'
    //         break;
    //     }
    //     case "item3_5": {
    //         url = './images/item3_5.jpg'
    //         break;
    //     }
    //     default:
    //         break;
    // }
    // if (message.length > 0) {
    //     await sendText(openid, message)
    // }
    // if (url.length > 0) {
    //     sendImage(url, openid)
    // }
    await sendSomething(openid, SendList)
}

async function sendSomething(openid, list) {
    for (let i in list) {
        if (list[i].image) {
            await sendImage(openid, list[i].image)
        } else if (list[i].message) {
            await sendText(openid, list[i].message)
        }
    }
}

async function sendText(openid, message) {
    await wechatApi.api.sendText(openid, message, function (err, result) {
        if (result.errcode == 0) {
            return true
        }
    });
}

async function sendImage(openid, url) {
    let patt = new RegExp("http")
    if (patt.test(url)) {
        // 先请求网络图片流
        // 获取远端图片
        axios({
            method: 'get',
            url: url,
            responseType: 'stream'
        }).then(async function (response) {
            const name = "./images/" + url.split("http://onedayqiniu.minidope.com/")[1]
            response.data.pipe(fs.createWriteStream(name))
            setTimeout(async () => {
                await wechatApi.api.uploadMedia(name, 'image', function (err, result) {
                    return wechatApi.api.sendImage(openid, result.media_id, function (err, result) {
                        return true
                    });
                });
            },2000)
        });
    } else {
        await wechatApi.api.uploadMedia(url, 'image', function (err, result) {
            return wechatApi.api.sendImage(openid, result.media_id, function (err, result) {
                return true
            });
        });
    }
}
