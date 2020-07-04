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

/**
 * 是否为空
 * */
function isEmpty(obj) {
    //检验null和undefined
    if (!obj && obj !== 0 && obj !== '') {
        return true;
    }
    //检验数组
    if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
        return true;
    }
    //检验对象
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
        return true;
    }
    return false;
}

// 时间格式化
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

module.exports = {
    getNonceStr: getNonceStr,
    isEmpty: isEmpty,
    formatTime: formatTime
};