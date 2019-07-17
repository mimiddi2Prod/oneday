const app = getApp()

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
function login(){
  wx.login({
    success: function(res) {
      request('http://127.0.0.1',data = {code:res.code},"post").then(function(res){
        console.info(res)
      })
    },
  })
}

// 微信支付
function pay(url, money, method = 'get') {
  console.info('---请求微信支付---')
  console.info(app.globalData.openid)
  console.info(money)
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: {
        openid: app.globalData.openid,
        money: money,
      },
      method: method,
      success: function(res) {
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