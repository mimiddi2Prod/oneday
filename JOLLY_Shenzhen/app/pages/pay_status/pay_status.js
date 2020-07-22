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
    total_number: 0,
    total_price: 0,
    create_time: '',
    take_meal_style: '',
    trade_id: '',
    // yinbao_order_no: '',

    tableNumber: '',

    // 用于优惠券
    card: null,
    discount_total_price: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tableNumber: app.globalData.tableNumber
    })
    console.info(options)
    if (options.tradeid) {
      let tradeid = options.tradeid
      this.getOrderDetailByTradeid(tradeid)
    }

  },

  getOrderDetailByTradeid: function (tradeid) {
    let self = this
    server.api(api.getOrderDetailByTradeid, {
      'openid': app.globalData.openid,
      'tradeid': tradeid
    }, 'post').then(function (res) {
      console.info(res)
      if (res.order_list.length > 0) {
        let total_price = 0
        let total_number = 0
        res.order_list = res.order_list.map(function (eData) {
          eData.subTotalPrice = Number(eData.price) * Number(eData.number)
          total_number += Number(eData.number)
          total_price += eData.subTotalPrice
          eData.param = JSON.parse(eData.param)
          eData.create_time = util.formatTime(new Date(eData.create_time))

          return eData
        })
        self.setData({
          order: res.order_list,
          create_time: res.order_list[0].create_time,
          take_meal_style: res.order_list[0].take_meal_style,
          total_number: total_number,
          total_price: Math.round(total_price * 100) / 100,
          trade_id: tradeid,
          table_number: res.order_list[0].table_number
          // yinbao_order_no: res.order_list[0].yinbao_order_no
        })
      }

      // 优惠券
      if (res.card) {
        self.setData({
          card: res.card,
          discount_total_price: self.data.total_price - (res.card.cash.reduce_cost / 100)
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})