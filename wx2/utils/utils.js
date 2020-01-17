/**
 * 获取随机数
 * */
function getNonceStr() {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    text += new Date().getTime()
    for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

module.exports = {
    getNonceStr: getNonceStr
};