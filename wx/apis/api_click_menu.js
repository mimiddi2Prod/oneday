var wechatApi = require("./../utils/wechat_api")

exports.run = async function (params) {
    return new Promise(async function (resolve, reject) {
        send(params)
    })

};

function send(param){
    let key = param.eventkey
    let openid = param.openid
    let message = ''
    let url = ''
    switch (key) {
        case "item1_1":{
            url = './images/item1_1.png'
            break;
        }
        case "item1_2":{
            url = './images/item1_2.png'
            break;
        }
        case "item1_3":{
            url = './images/item1_3.png'
            break;
        }
        case "item1_4":{
            url = './images/item1_4.png'
            break;
        }
		case "item1_5":{
            url = './images/item1_5.jpg'
            break;
        }
        case "item2_1":{
            message = '关于设计改造，可添加微信：sm278118152 或 tina7640 沟通：）'
            break;
        }
        case "item2_2":{
            // message = '关于民宿合作，可添加微信：sm278118152 或 tina7640 沟通：）'
			url = './images/item2_2.png'
            break;
        }
        case "item3_1":{
            url = './images/item3_1.png'
            break;
        }
        case "item3_4":{
            message = '简历邮箱：oneday830@163.com\n' +
                '服务投诉：oneday830@163.com'
            break;
        }
        case "item3_5":{
            url = './images/item3_5.jpg'
            break;
        }
        default:
            break;
    }
    if(message.length > 0){
        sendText(openid,message)
    }
    if(url.length > 0){
        sendImage(url,openid)
    }
}

function sendText(openid,message){
    wechatApi.api.sendText(openid, message, function(err,result){
        if(result.errcode == 0){

        }
    });
}

function sendImage(url,openid){
    wechatApi.api.uploadMedia(url, 'image', function(err,result){
        wechatApi.api.sendImage(openid, result.media_id, function(err,result){

        });
    });
}