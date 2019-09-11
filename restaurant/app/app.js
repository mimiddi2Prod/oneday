//app.js
const server = require('/utils/server.js')
const api = require('/config/api.js')

App({
  onLaunch: function() {
    let self = this
    wx.login({
      success: function(res) {
        server.request(api.getOpenid, {
          code: res.code
        }, "post").then(function(res) {
          self.globalData.openid = res.openid
          self.globalData.phone = res.phone
          console.info(res)
          // if (res.customer) {
          //   self.globalData.isCustomer = true
          //   self.globalData.point = res.customer.data.point
          //   self.globalData.balance = res.customer.data.balance
          //   self.globalData.discount = res.customer.data.discount
          // }
        })
      }
    })
  },
  globalData: {
    openid: '',
    phone: '',
    cart: [],

    point: 0,
    balance: 0,
    discount: 0,
    isCustomer: false,
    customerUid:0,
  }
})