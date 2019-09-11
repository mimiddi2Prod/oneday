// pages/cart/cart.js
const server = require('../../utils/server.js')
const api = require('../../config/api.js');
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    totalPrice: 0,
    styleList: ['堂食', '外带'],
    style: 0,

    dinnersNumber: 1,
    showPayMethodDialog: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCart()
  },

  dinnerNum: function(e) {
    this.setData({
      dinnersNumber: Number(e.detail.value)
    })
  },

  blur: function(e) {
    if (Number(e.detail.value) == 0) {
      this.setData({
        dinnersNumber: 1
      })
    }
  },

  getCart: function() {
    let cart = app.globalData.cart
    let totalPrice = 0
    cart = cart.map(function(eData) {
      eData.subTotalPrice = eData.price * eData.number
      totalPrice = totalPrice + eData.subTotalPrice
      return eData
    })
    this.setData({
      cart: cart,
      totalPrice: totalPrice
    })
    console.info(this.data.cart)
  },

  selectStyle: function(e) {
    this.setData({
      style: e.currentTarget.dataset.id
    })
  },



  submitOrder: function() {
    this.setData({
      showPayMethodDialog: true
    })
  },

  payDialog: function() {
    this.setData({
      showPayMethodDialog: false
    })
  },

  wxPay: function() {
    let self = this
    console.info(app.globalData.openid)
    server.pay(api.payfee, app.globalData.openid, self.data.totalPrice, "post").then(function(res) {
      console.info(res)
      let tradeId = res
      self.addOrder(tradeId)
    }).catch(function(res) {
      wx.showModal({
        title: '支付失败',
        content: '请重新支付，支付订单完成大厨就开工啦',
      })
    })
  },

  balancePay: function() {
    let self = this
    let data = {}
    console.info(app.globalData.customerUid)
    if (!app.globalData.isCustomer) {
      wx.showModal({
        title: '支付失败',
        content: '您还没有办理会员卡，是否前往注册',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../customer/customer',
            })
          }
        }
      })
      return
    }
    if (self.data.totalPrice > app.globalData.balance) {
      wx.showModal({
        title: '支付失败',
        content: '会员卡余额不足，请前往前台充值',
        showCancel: false
      })
      return
    }
    data.customerUid = app.globalData.customerUid
    data.balanceIncrement = self.data.totalPrice
    data.pointIncrement = self.data.totalPrice
    server.request(api.balancePay, data, "post").then(function(res) {
      console.info(res)
      let tradeId = self.getTradeId()
      self.addOrder(tradeId)
    })
  },

  getTradeId: function () {
    var date = new Date().getTime().toString()
    var text = ""
    var possible = "0123456789"
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    var tradeId = 'br_' + date + text + 'y'
    console.info(tradeId)
    return tradeId
  },

  addOrder: function(tradeId) {
    let self = this
    console.info(this.data.cart)
    let data = {}
    data.openid = app.globalData.openid
    data.style = self.data.style
    data.dinnersNumber = self.data.dinnersNumber
    // data.tradeId = util.formatTime(new Date()).toString()
    data.tradeId = tradeId
    data.cart = self.data.cart
    server.request(api.addOrder, data, "post").then(function(res) {
      console.info(res)
      if (res.code == 0) {
        app.globalData.cart = []
        wx.redirectTo({
          url: '../pay_status/pay_status?tradeid=' + data.tradeId,
        })
      }
    })
  },

  cutDinnersNumber: function() {
    this.setData({
      dinnersNumber: (this.data.dinnersNumber > 1 ? this.data.dinnersNumber - 1 : this.data.dinnersNumber)
    })
  },

  addDinnersNumber: function() {
    console.info(this.data.dinnersNumber)
    this.setData({
      dinnersNumber: (this.data.dinnersNumber + 1)
    })
  },

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