function API() {
}

API.prototype.run = async function (apiName, params) {
    return new Promise(async function (resolve, reject) {
        switch (apiName) {
            case "test": {
                resolve(await require('../apis/api_test.js').run(params))
                break;
            }
            case "subscribe_message": {
                resolve(await require('../apis/api_subscribe_message.js').run(params))
                break;
            }
            case "scan": {
                resolve(await require('../apis/api_scan.js').run(params))
                break;
            }
            case "click_menu": {
                resolve(await require('../apis/api_click_menu.js').run(params))
                break;
            }
            case "reply": {
                resolve(await require('../apis/api_reply.js').run(params))
                break;
            }
            case "create_menu": {
                resolve(await require('../apis/api_create_menu.js').run(params))
                break;
            }
            case "create_limit_qr_code": {
                resolve(await require('../apis/api_create_limit_qr_code.js').run(params))
                break;
            }
            default:
                resolve({
                    errcode: 1,
                    errmsg: 'no api'
                })
                break;
        }
    })
};

module.exports = API;
