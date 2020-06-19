// pages/order/order.js
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
    tableNumber:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info(app.globalData.tableNumber)
    this.setData({
      tableNumber: app.globalData.tableNumber
    })
    this.getOrder()
  },

  getOrder: function() {
    let self = this
    server.api(api.getOrderByOpenid, {
      'openid': app.globalData.openid
    }, 'post').then(function(res) {
      console.info(res)
      if (res.order) {
        self.data.order = res.order.map(function(eData) {
          eData.total_price = 0
          eData.total_number = 0
          let arr_price = eData['group_concat(price)'].split(','),
            arr_number = eData['group_concat(number)'].split(',')
          for (let i in arr_number) {
            eData.total_number += Number(arr_number[i])
          }
          for (let i in arr_price) {
            eData.total_price += Number(arr_price[i]) * Number(arr_number[i])
          }
          eData.create_time = util.formatTime(new Date(eData.create_time))
          return eData
        })
        self.setData(self.data)
      }
      console.info(self.data.order)
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