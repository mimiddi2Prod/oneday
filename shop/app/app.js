//app.js
const server = require('/utils/server.js')
const api = require('/config/api.js')
App({
  onLaunch: function () {
    // 手机信息 适配tabbar
    // var self = this
    // wx.getSystemInfo({
    //   success: function (res) {
    //     self.globalData.model = res.model
    //     let model = res.model.substring(0, res.model.indexOf('X')) + 'X'
    //     if (model == "iPhone X") {
    //       self.globalData.isIpx = true
    //     }
    //   }
    // })
    var self = this
    wx.login({
      success: function (res) {
        server.api(api.getOpenid, {
          code: res.code
        }, "post").then(function (res) {
          self.globalData.openid = res.openid
          self.login(res.openid)
        })
      }
    })
  },

  login: function (openid) {
    var self = this
    server.api(api.login, {
      op_id: openid
    }, "post").then(function (res) {
      console.info(res)
      if (res.length <= 0) {

      } else {
        // console.info(res)
        self.globalData.user_id = res.user_id
        self.globalData.userInfo = {}
        self.globalData.userInfo.avatarUrl = res.avatar
        self.globalData.userInfo.nickName = decodeURIComponent(res.nick_name)
        if (res.address.length > 0) {
          // console.info(res.address[0])
          self.globalData.default_address = res.address[0]
        }
      }
    })
  },
  globalData: {
    // userInfo: null,

    // 手机型号
    // model: null,
    // isIpx: false,
    openid: '',
    user_id: '',
    integral: 0,
    userInfo: null,
    default_address: null,
    subCategory: {},
    refreshOrder: false,
    refreshCart: false,
    refreshAfterSale: false,

    orderList: [],
    orderDetail: [],
    payInfo: {},

    selectAddress: null,
  }
})