// pages/blank/blank.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    // console.info(options)
    let status = false
    let expire_time = options.expire_time ? new Date(Number(options.expire_time)) : app.globalData.expire_time //公众号二维码链接过期时间
    app.globalData.expire_time = expire_time
    let current_time = new Date()
    // console.info('过期时间' + expire_time)
    // console.info('当前时间' + current_time)
    let number = options.id ? options.id : app.globalData.number //桌号
    app.globalData.number = number
    let locationCode = 'szsn'
    if (expire_time >= current_time) {
      status = true
    }
    if (status) {
      let Interval = setInterval(() => {
        if (wx.getStorageSync("token")) {
          wx.redirectTo({
            url: '../index/index?number=' + number + '&locationCode=' + locationCode,
          })
          clearInterval(Interval)
        }
      }, 500)
    } else {
      wx.redirectTo({
        url: '../index/timeout',
      })
    }

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