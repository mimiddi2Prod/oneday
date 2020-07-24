function API() {
}

API.prototype.run = async function (apiName, params) {
    return new Promise(async function (resolve, reject) {
        switch (apiName) {
            case "test": {
                resolve(await require('../apis/api_test.js').run(params))
                break;
            }
            case "get_openid": {
                resolve(await require('../apis/api_get_openid.js').run(params))
                break;
            }
            case "get_category_by_location_code": {
                resolve(await require('../apis/api_get_category_by_location_code.js').run(params))
                break;
            }
            case "get_banner": {
                resolve(await require('../apis/api_get_banner.js').run(params))
                break;
            }
            case "get_subscribe_message": {
                resolve(await require('../apis/api_get_subscribe_message.js').run(params))
                break;
            }
            case "check_order_stock": {
                resolve(await require('../apis/api_check_order_stock.js').run(params))
                break;
            }
            case "restore_stock": {
                resolve(await require('../apis/api_restore_stock.js').run(params))
                break;
            }
            case "payfee": {
                resolve(await require('../apis/api_payfee.js').run(params))
                break;
            }
            case "get_order_by_openid": {
                resolve(await require('../apis/api_get_order_by_openid.js').run(params))
                break;
            }
            case "get_order_detail_by_tradeid": {
                resolve(await require('../apis/api_get_order_detail_by_tradeid.js').run(params))
                break;
            }
            case "wxPayNotify": {
                resolve(await require('../apis/notify_wxPay.js').run(params))
                break;
            }
            case "get_user_phone": {
                resolve(await require('../apis/api_get_user_phone.js').run(params))
                break;
            }
            case "check_balance": {
                resolve(await require('../apis/api_check_balance.js').run(params))
                break;
            }
            case "add_order": {
                resolve(await require('../apis/api_add_order.js').run(params))
                break;
            }

            // no use
            case "save_user_info": {
                resolve(await require('../apis/api_save_user_info.js').run(params))
                break;
            }
            case "get_qiniu_upload_token": {
                resolve(await require('../apis/api_get_qiniu_upload_token.js').run(params))
                break;
            }
            /**
             * 优惠券相关
             * 使用 add_coupon_card, get_coupon_card
             * 需要开启 /Node/WeChat/WeChatServer 的服务
             * */
            case "add_coupon_card": {
                resolve(await require('../apis/wechat_add_coupon_card.js').run(params))
                break;
            }
            case "get_coupon_card": {
                resolve(await require('../apis/wechat_get_coupon_card.js').run(params))
                break;
            }
            case "save_obtain_coupon_card": {
                resolve(await require('../apis/api_save_obtain_coupon_card.js').run(params))
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
