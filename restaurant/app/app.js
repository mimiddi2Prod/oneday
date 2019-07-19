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
          self.globalData.openid = res
        })
      }
    })
  },
  globalData: {
    openid: '',
    cart: []
  }
})