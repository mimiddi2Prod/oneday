const appid = 'wx14dd6120d4882a81'  // 不浪费
const secret = 'b77ba947d1168d6eff00816ea2f0cf5d'

/**
 * mch_id:商户号
 * PAY_API_KEY:商户密钥
 * body:商品描述,商品简单描述，例如:腾讯充值中心-QQ会员充值
 * attach:是一个任意的字符串, 会原样返回, 可以用作一个标记
 * notify_url:通知地址  确保外网能正常访问(支付结果回调)
 * spbill_create_ip:支持IPV4和IPV6两种格式的IP地址。调用微信支付API的机器IP
 */
/**
 * wxpay
 */
const attach = 'test' // attach 是一个任意的字符串, 会原样返回, 可以用作一个标记
const body = 'BrunchTest'
const mch_id = "1508603281" // 商户号
const PAY_API_KEY = '81ef119935811ab9339b8c802a2ffc7B' // 商户密钥
const notify_url = 'https://brunch.minidope.com/apis/restaurant_wxPay_notify' //通知地址  确保外网能正常访问
const spbill_create_ip = '120.79.94.138' // 终端IP

// const qqMapSubkey = "AUNBZ-4JZL4-NPYUP-XY5GK-OTW6F-6IFTO" // 腾讯地图

module.exports = {
    appid: appid,
    secret: secret,
    attach: attach,
    body: body,
    mch_id: mch_id,
    PAY_API_KEY: PAY_API_KEY,
    notify_url: notify_url,
    spbill_create_ip: spbill_create_ip
    // qqMapSubkey:qqMapSubkey,
}