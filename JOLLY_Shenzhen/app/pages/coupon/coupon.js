// pages/coupon/coupon.js
const util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: [],
    selectCard: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let price = Number(options.price)
    let cardList = app.globalData.cardList
    cardList = cardList.map(function(e) {
      e.begin_time = util.formatTime(new Date(e.begin_time))
      e.end_time = util.formatTime(new Date(e.end_time))
      if (e.least_cost <= price) {
        e.canUseCoupon = true
      } else {
        e.canUseCoupon = false
      }
      return e
    })

    this.setData({
      cardList: cardList,
      selectCard: app.globalData.selectCard
    })
  },

  selectCard: function(e) {
    let data = e.currentTarget.dataset
    if (data.canuse) {
      if (!this.data.selectCard) {
        this.data.selectCard = this.data.cardList.filter(function(item) {
          return item.id == data.id
        })[0]
      } else {
        this.data.selectCard = this.data.selectCard.id == data.id ? null : this.data.cardList.filter(function (item) {
          return item.id == data.id
        })[0]
      }
      this.setData(this.data)
      // app.globalData.selectCard = this.data.cardList.filter(function(item) {
      //   return item.id == data.id
      // })[0]
      // wx.navigateBack({})
    } else {
      wx.showToast({
        title: '不满足满减条件',
        icon: 'none'
      })
    }
  },

  back: function() {
    app.globalData.selectCard = this.data.selectCard
    wx.navigateBack({})
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