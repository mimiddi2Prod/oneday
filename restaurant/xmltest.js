const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()

RestaurantWxPayNotify()
function RestaurantWxPayNotify() {
    let xml = '<xml><appid><![CDATA[wx3a3f97ca688ddcea]]></appid>\n' +
        '<attach><![CDATA[br]]></attach>\n' +
        '<bank_type><![CDATA[CFT]]></bank_type>\n' +
        '<cash_fee><![CDATA[1]]></cash_fee>\n' +
        '<fee_type><![CDATA[CNY]]></fee_type>\n' +
        '<is_subscribe><![CDATA[N]]></is_subscribe>\n' +
        '<mch_id><![CDATA[1555664181]]></mch_id>\n' +
        '<nonce_str><![CDATA[erhqepCTSUD8XpA7]]></nonce_str>\n' +
        '<openid><![CDATA[oVSyv4gm5CHUKH7O8MOYkX7ssVhI]]></openid>\n' +
        '<out_trade_no><![CDATA[br_157119318824443664]]></out_trade_no>\n' +
        '<result_code><![CDATA[SUCCESS]]></result_code>\n' +
        '<return_code><![CDATA[SUCCESS]]></return_code>\n' +
        '<sign><![CDATA[571AABA4BDFFD434BA685BEC71734899]]></sign>\n' +
        '<time_end><![CDATA[20191016103449]]></time_end>\n' +
        '<total_fee>1</total_fee>\n' +
        '<trade_type><![CDATA[JSAPI]]></trade_type>\n' +
        '<transaction_id><![CDATA[4200000425201910161340707541]]></transaction_id>\n' +
        '</xml>'

    // todo 修改订单支付状态 并且给银豹发送订单请求
    xmlParser.parseString(xml, (err, success) => {
        console.info(err)
        console.info(success)
        // if (err) {
        //     log('parser xml error ', err)
        // } else {
        //     // console.info(success)
        //     // if (success.xml.return_code[0] === 'SUCCESS') {
        //     //     const prepayId = success.xml.prepay_id[0]
        //     //     const payParamsObj = getPayParams(prepayId, tradeId)
        //     //     // 返回给前端, 这里是 express 的写法
        //     //     // res.json(payParamsObj)
        //     //     resolve(payParamsObj)
        //     // } else {
        //     //     // 错误处理
        //     //     if (err) {
        //     //         log('axios post error', err)
        //     //         reject(502)
        //     //         // res.sendStatus(502)
        //     //     } else if (success.xml.return_code[0] !== 'SUCCESS') {
        //     //         // res.sendStatus(403)
        //     //         reject(403)
        //     //     }
        //     // }
        // }
    })

}