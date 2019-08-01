// pages/pay_status/pay_status.js
const server = require('../../utils/server.js')
const api = require('../../config/api.js');
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [],
    total_price: 0,
    create_time:'',
    style:'',
    trade_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info(options)
    if (options.tradeid) {
      let tradeid = options.tradeid
      this.getOrderDetailByTradeid(tradeid)
    }

  },

  getOrderDetailByTradeid: function(tradeid) {
    let self = this
    server.request(api.getOrderDetailByTradeid, {
      'openid': app.globalData.openid,
      'tradeid': tradeid
    }, 'post').then(function(res) {
      console.info(res)
      if (res.order_list.length > 0) {
        let total_price = 0
        res.order_list = res.order_list.map(function(eData) {
          eData.subTotalPrice = Number(eData.price) * Number(eData.number)
          total_price += eData.subTotalPrice
          eData.param = JSON.parse(eData.param)
          eData.create_time = util.formatTime(new Date(eData.create_time))
          
          return eData
        })
        self.setData({
          order: res.order_list,
          create_time: res.order_list[0].create_time,
          style: res.order_list[0].style,
          total_price: total_price,
          trade_id: tradeid
        })
      }
    })
    // let cart = app.globalData.cart
    // let totalPrice = 0
    // cart = cart.map(function(eData) {
    //   eData.subTotalPrice = eData.price * eData.number
    //   totalPrice = totalPrice + eData.subTotalPrice
    //   return eData
    // })
    // this.setData({
    //   cart: cart,
    //   totalPrice: totalPrice
    // })
    // console.info(this.data.cart)
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