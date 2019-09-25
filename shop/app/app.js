//app.js
const server = require('/utils/server.js')
const api = require('/config/api.js')
App({
  onLaunch: function() {
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
      success: function(res) {
        server.api(api.getOpenid, {
          code: res.code
        }, "post").then(function(res) {
          self.globalData.openid = res.openid
          if (res.phone) {
            self.globalData.phone = res.phone
            if (res.customer) {
              self.globalData.isCustomer = true
              self.globalData.point = res.customer.data.point
              self.globalData.balance = res.customer.data.balance
              self.globalData.discount = res.customer.data.discount
              self.globalData.customerUid = res.customer.data.customerUid
            }
          }
          self.login(res.openid)
        })
      }
    })

    // 1分钟检查一次 小程序存活就更新时间
    let Interval = setInterval(function() {
      self.check_token()
    }, 60000)
  },

  onShow: function() {
    var self = this
    console.info(self.globalData.check_token)
    if (self.globalData.check_token) {
      self.check_token()
    }
  },

  check_token: function() {
    var self = this
    let url = api.queueUpdateTimeByToken
    wx.request({
      url: url,
      data: {
        token: self.globalData.token
      },
      method: "post",
      success: function(res) {
        console.info(res)
        if (res.data.data.code == 0) {
          wx.reLaunch({
            url: '../blank/blank',
          })
        }
      },
    })
  },

  login: function(openid) {
    var self = this
    server.api(api.login, {
      op_id: openid
    }, "post").then(function(res) {
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
    // 排队等待
    check_token: false,
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

    phone: '',
    // 银豹会员信息
    customerUid: '',
    point: 0,
    balance: 0,
    discount: 0,
    isCustomer: false
  }
})