// pages/order/order.js
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCart()
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