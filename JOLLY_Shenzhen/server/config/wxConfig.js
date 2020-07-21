const appid = 'wx98a0eb2df04ce3cc'  // jolly森南
const secret = '0cfe7e1172bcd83bcc110762ec6d901e'

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
const attach = 'szsn' // attach 是一个任意的字符串, 会原样返回, 可以用作一个标记
const body = 'jolly森南店'
const mch_id = "1600949561" // 商户号
const PAY_API_KEY = '0cfe7e1172bcd83bcc110762ec6d901e' // 商户密钥
const notify_url = 'https://miniszsn.jolly.youyueworld.com/apis/wxPayNotify' //通知地址  确保外网能正常访问
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