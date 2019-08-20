// pages/payResult/payResult.js
const app = getApp()
// const pay = require('../../utils/pay.js')
// const api = require('../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.info(JSON.stringify(app.globalData.payInfo))
    // app.globalData.payInfo = {
    //   "address": {
    //     "full_region": "福建省福州市鼓楼区",
    //     "address": "杨桥西路 23号",
    //     "isDefault": true,
    //     "id": 1,
    //     "name": "汪洋",
    //     "mobile": "13022222222"
    //   },
    //   "state": 0,
    //   "actualPrice": "65.00"
    // }
    this.setData({
      payInfo: app.globalData.payInfo
    })
  },

  // rePay: function() {
  //   // 拉起支付
  //   pay.pay(api.payfee, app.globalData.payInfo.actualPrice, "post").then(function(res) {
  //     console.info(res)
  //   }).catch(function(res){
  //     console.info(res)
  //   })
  // },

  // addOrderByState: function (state, tradeId) {
  //   console.info(this.data.checkedGoodsList)
  //   var orderList = this.data.checkedGoodsList
  //   var address = this.data.checkedAddress
  //   var self = this
  //   var submitNum = 0
  //   console.info(address)
  //   for (var i in orderList) {
  //     var data = {}
  //     data.user_id = app.globalData.user_id
  //     data.item_id = orderList[i].item_id
  //     data.param_id_1 = orderList[i].item_param_id_1
  //     data.param_id_2 = orderList[i].item_param_id_2
  //     data.number = orderList[i].number
  //     data.single_price = orderList[i].price
  //     data.postage = 0
  //     data.state = state
  //     data.address_text = address.full_region + address.address
  //     data.tel = address.mobile
  //     data.receiver = address.name
  //     data.tradeId = tradeId
  //     server.api(api.submitOrder, data, "post").then(function (res) {
  //       console.info(res)
  //       if (res.text == "添加订单成功") {
  //         submitNum++
  //         if (submitNum == orderList.length) {
  //           // 跳转显示订单状态
  //           app.globalData.payInfo.address = address
  //           app.globalData.payInfo.state = state
  //           app.globalData.payInfo.actualPrice = self.data.actualPrice

  //           wx.redirectTo({
  //             url: '../../payResult/payResult',
  //           })
  //         }
  //       } else {
  //         wx.showModal({
  //           title: '下单失败',
  //           showCancel: false,
  //         })
  //       }
  //     })
  //   }
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})