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
        case "item2_2":{
            url = './images/wanshang.jpg'
            break;
        }
        case "item2_4":{
            url = './images/traffic.jpg'
            break;
        }
        case "item3_1":{
            message = '️☎详询更多，可致电客服：19859263629'
            break;
        }
        case "item3_2":{
            url = './images/join.jpg'
            break;
        }
        case "item3_4":{
            url = './images/load.jpg'
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