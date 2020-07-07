checkToken()
function checkToken() {
  let token_expire = wx.getStorageSync('token_expire')
  if (token_expire) {
    if (new Date().getTime() > token_expire) {
      wx.removeStorageSync('token_expire')
    }
  }
}
/**
 * http请求封装
 * RequestType：小程序请求标记
 * token：每次登录的一个随机字符串
 * */
function api(url, data = {}, method = "GET") {
  data.RequestType = 'mini~niconiconi~program'
  data.token = wx.getStorageSync("token") || null
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      success: (res) => {
        if (res.data.errcode == 0) {
          resolve(res.data.data);
        } else if (res.data.errcode == 10001) {
          // 重新登录
          wx.reLaunch({
            url: '/pages/index/index',
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: res.data.errmsg,
            icon: 'none'
          })
        }
      },
      fail: (res) => {
        wx.hideLoading()
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
    })
  })
}

// 微信支付
function pay(url, data = {}, method = 'get') {
  // console.info('---请求微信支付---')
  data.RequestType = 'mini~niconiconi~program'
  data.token = wx.getStorageSync("token") || null
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      success: function (res) {
        // console.info(res)
        if (res.data.data.addOrderStatus.code == 1) {
          wx.hideLoading()
          wx.showModal({
            title: '错误',
            content: res.data.data.addOrderStatus.text,
            showCancel: false
          })
          return
        }
        // console.info('---success---')
        // console.info(res)
        let tradeId = res.data.data.out_trade_no
        // 调起支付
        wx.requestPayment({
          'timeStamp': res.data.data.timeStamp,
          'nonceStr': res.data.data.nonceStr,
          'package': res.data.data.package,
          'signType': 'MD5',
          'paySign': res.data.data.paySign,
          'success': function (res) {
            // console.info('---支付success返回---')
            // console.info(res)
            resolve(tradeId)
          },
          'fail': function (res) {
            // console.info('---支付fail返回---')
            // console.info(res)
            reject(tradeId)
          }
        });
      },
      fail: function (res) {
        wx.showModal({
          content: '请求错误',
        })
        reject(res.data)
      }
    });
  })
}

/**
 * 七牛云图片上传
 * 存储区域:
 * 华东：
 *  地域简称（z0）
 *  上传域名（服务器端上传：http(s)://up.qiniup.com，客户端上传： http(s)://upload.qiniup.com）
 * 华北：
 *  地域简称（z1）
 *  上传域名（服务器端上传：http(s)://up-z1.qiniup.com，客户端上传：http(s)://upload-z1.qiniup.com）
 * 华南：
 *  地域简称（z2）
 *  上传域名（服务器端上传：http(s)://up-z2.qiniup.com，客户端上传：http(s)://upload-z2.qiniup.com）
 * 北美：
 *  地域简称（na0）
 *  上传域名（服务器端上传：http(s)://up-na0.qiniup.com，客户端上传：http(s)://upload-na0.qiniup.com）
 * 东南亚：
 *  地域简称（as0）
 *  上传域名（服务器端上传：http(s)://up-as0.qiniup.com，客户端上传：http(s)://upload-as0.qiniup.com）
 * 
 * url需根据在七牛云上创建的存储区域进行更改
 * */
function qiniuUpload(data = {}) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: 'https://up.qiniup.com/',
      filePath: data.tempFilePath,
      name: 'file',
      formData: {
        'key': data.key,
        'token': data.uploadToken
      },
      success: (res) => {
        if (res.statusCode == 200) {
          resolve(res.statusCode)
        } else {
          wx.showToast({
            title: '图片上传失败',
          })
        }
      },
    })
  })
}


module.exports = {
  api: api,
  pay: pay,
  qiniuUpload: qiniuUpload
};