var db = require("./../utils/dba");
const wxPay = require("../utils/wxpay")
const wxConfig = require("../config/wxConfig")
var addOrder = require('./api_add_order')

exports.run = async function (params) {
    let data = null
    return new Promise(async function (resolve, reject) {
        data = await getData(params)
        if (!data.err) {
            resolve({
                errcode: 0,
                errmsg: "request success",
                data: data
            })
        } else {
            reject({
                errcode: 2,
                errmsg: "request fail"
            })
        }
    })
};

/**
 * selcCardInfo:已选优惠券信息 (null/object)
 * totalPrice:商品总价合计
 *
 */
async function getData(params) {
    // const log = console.log.bind(console)
    // log(params)
    let payfeeData = {
        total_fee: Math.round((params["selcCardInfo"] ? (params['totalPrice'] - params["selcCardInfo"].reduce_cost) : params['totalPrice'])*100)/100,
        openid: params["openid"],
        out_trade_no: await wxPay.getTradeId(wxConfig.attach)
    }, call = await wxPay.payfee(payfeeData) || null;
    if (call) {
        // 获得订单号后，将订单添加到数据库 并且支付状态为未支付
        let order = Object.assign(params, {tradeId: call.out_trade_no, payStatus: 0})
        // 新增 优惠券信息
        // order.coupon = params["selcCardInfo"]
        let callback = await addOrder.run(order)
        call.addOrderStatus = callback.data
    }
    return call
}
