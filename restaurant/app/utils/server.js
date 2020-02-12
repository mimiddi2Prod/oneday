// const app = getApp()

// 接口请求
function request(url, data = {}, method = "GET") {
  console.info('---postData:---')
  console.info(data)
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      success: function(res) {
        console.info('---success---')
        console.info(res)
        if (res.data.res.code == 0) {
          resolve(res.data.data);
        } else {
          wx.showToast({
            title: res.data.res.text,
            icon: 'none'
          })
        }
      },
    })
  })
}

// 微信登录
function login() {
  wx.login({
    success: function(res) {
      request('http://127.0.0.1', data = {
        code: res.code
      }, "post").then(function(res) {
        console.info(res)
      })
    },
  })
}

// 微信支付
function pay(url, openid, money, coupon, order, method = 'get') {
  console.info('---请求微信支付---')
  // console.info(openid)
  // console.info(money)
  // console.info(coupon)
  // console.info(order)
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: {
        openid: openid,
        money: money,
        order: order,
        coupon: coupon
      },
      method: method,
      success: function(res) {
        console.info(res)
        if (res.data.data.addOrderStatus.code == 1) {
          wx.hideLoading()
          wx.showModal({
            title: '错误',
            content: res.data.data.addOrderStatus.text,
            showCancel: false
          })
          return
        }
        console.info('---success---')
        console.info(res)
        let tradeId = res.data.data.tradeId
        // 调起支付
        wx.requestPayment({
          'timeStamp': res.data.data.timeStamp,
          'nonceStr': res.data.data.nonceStr,
          'package': res.data.data.package,
          'signType': 'MD5',
          'paySign': res.data.data.paySign,
          'success': function(res) {
            console.info('---支付success返回---')
            console.info(res)
            resolve(tradeId)
          },
          'fail': function(res) {
            console.info('---支付fail返回---')
            console.info(res)
            reject(tradeId)
          }
        });
      },
      fail: function(res) {
        wx.showModal({
          content: '请求错误',
        })
        reject(res.data)
      }
    });
  })
}

// 七牛云图片存储
function qiniuUpload(data = {}) {
  return new Promise(function(resolve, reject) {
    wx.uploadFile({
      url: 'https://up.qiniup.com/',
      filePath: data.tempFilePath,
      name: 'file',
      formData: {
        'key': data.key,
        'token': data.uploadToken
      },
      success: function(res) {
        // console.info(res)
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
  request: request,
  pay: pay,
  qiniuUpload: qiniuUpload
};