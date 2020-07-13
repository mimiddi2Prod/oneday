function API() {
}

API.prototype.run = async function (apiName, params) {
    return new Promise(async function (resolve, reject) {
        switch (apiName) {
            case "test": {
                resolve(await require('../apis/api_test.js').run(params))
                break;
            }
            case "get_public_key": {
                resolve(await require('../apis/api_get_public_key.js').run(params))
                break;
            }
            case "sign_in": {
                resolve(await require('../apis/api_sign_in.js').run(params))
                break;
            }
            case "get_product": {
                resolve(await require('../apis/api_get_product.js').run(params))
                break;
            }
            case "set_product": {
                resolve(await require('../apis/api_set_product.js').run(params))
                break;
            }
            case "get_category_and_product": {
                resolve(await require('../apis/api_get_category_and_product.js').run(params))
                break;
            }
            case "create_order": {
                resolve(await require('../apis/api_create_order.js').run(params))
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
            case "get_trade": {
                resolve(await require('../apis/api_get_trade.js').run(params))
                break;
            }
            case "after_sale": {
                resolve(await require('../apis/api_after_sale.js').run(params))
                break;
            }
            case "set_pending_order": {
                resolve(await require('../apis/api_set_pending_order.js').run(params))
                break;
            }
            case "get_pending_order": {
                resolve(await require('../apis/api_get_pending_order.js').run(params))
                break;
            }
            case "set_pending_order_num": {
                resolve(await require('../apis/api_set_pending_order_num.js').run(params))
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
