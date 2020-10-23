/**
 * 信息主体：jolly brunch
 * appid：公众号id
 * secret：公众号密钥
 * token：可任意填写，用于生成签名。
 * EncodingAESKey：用于消息体的加密，是 AES 密钥的 Base64 编码。
 * */
// const appid = 'wx4720629905ab9a90' // test
const appid = "wx9a7f04eeea0842be"
// const secret = 'a8ba4d24824b82af2e6decce9f576873'
// const token = 'odtest'
// const EncodingAESKey = "lHxyzBdCBdSgHmK7kBpChUMiF5grezlgbJeDjs4ifdz"
const restaurant_mini_appid = 'wx3a3f97ca688ddcea' // 公众号 跳转 brunch小程序

module.exports = {
    appid: appid,
    // secret: secret,
    // token: token,
    // EncodingAESKey: EncodingAESKey,
    restaurant_mini_appid: restaurant_mini_appid
}