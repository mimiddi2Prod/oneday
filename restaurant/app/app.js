//app.js
const server = require('/utils/server.js')
const api = require('/config/api.js')

App({
  onLaunch: function() {
    if (wx.canIUse("getUpdateManager")) {
      let updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate);
      })
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          showCancel: false,
          success: (res) => {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            } else if (res.cancel) {
              return false;
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新的版本下载失败
        wx.hideLoading();
        wx.showModal({
          title: '升级失败',
          content: '新版本下载失败，请检查网络！',
          showCancel: false
        });
      });
    }

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
    customerUid: 0,
    customerNumber: 0,

    restaurantTableName: 0,

    expire_time: '',
    number: 0,

    // 用于展示优惠券列表，在coupon页面可选
    cardList: [],
    // 在coupon页面中，选中的优惠券
    selectCard: null,
  }
})