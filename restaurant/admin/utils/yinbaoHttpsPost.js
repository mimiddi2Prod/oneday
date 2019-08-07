const md5 = require('blueimp-md5') // 银豹组合appkey加密
const https = require('https');
const yinbaoConfig = require('./../config/yinbaoConfig')

module.exports = async function request(router, postDataJson) {
    console.info(router)
    console.info(postDataJson)
    const appKey = yinbaoConfig.appKey
    let timeStamp = new Date().getTime()

    // let postDataJson = JSON.stringify(postData)
    let sign = md5(appKey + postDataJson).toUpperCase()

    let path = await getPath(router)

    var options = {
        host: yinbaoConfig.host,
        port: yinbaoConfig.port,
        path: path,
        method: 'POST',
        form: postDataJson,
        headers: {
            'User-Agent': 'openApi',
            'Content-Type': 'application/json;charset=utf-8',
            'accept-encoding': 'gzip,deflate',
            'time-stamp': timeStamp,
            'data-signature': sign,
        },
    }

    let e = await HttpsPost(options, postDataJson, sign)
    return e
}

async function getPath(router) {
    let path = '/pospal-api2/openapi/v1/'
    switch (router) {
        case "addOnLineOrder":
            path += 'orderOpenApi/addOnLineOrder'
            break;
        case "queryAllCashier":
            path += 'cashierOpenApi/queryAllCashier'
            break;
        case "queryProductImagePages":
            path += 'productOpenApi/queryProductImagePages'
            break;
        case "queryProductByUid":
            path += 'productOpenApi/queryProductByUid'
            break;
        default:
            console.info('没有发现能够匹配的path')
            return;
    }

    return path
}

async function HttpsPost(option, postData, sign) {
    return new Promise(function (resolve, reject) {
        var req = https.request(option, function (res) {
            let data = '';
            res.headers = {
                'data-signature': sign,
                'Content-Type': 'application/json;charset=UTF-8'
            }
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data += chunk;
            })
            res.on('end', function (e) {
                resolve(data)
            })
        })
        req.write(postData);
        req.end();
    })
}

// async function HttpsGet(option) {
//     return new Promise(function (resolve, reject) {
//         https.get(option, function (res) {
//             let data = ''
//             res.on('data', function (chunk) {
//                 data += chunk;
//             })
//             res.on('end', function (e) {
//                 resolve(data)
//             })
//         })
//     })
// }