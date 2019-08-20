// pages/brandDetail/brandDetail.js
const server = require('../../utils/server.js')
const api = require('../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand_id: '',
    brand_name: '',
    brand_img: '',
    desc: '',
    goodsList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.info(options)
    this.setData({
      brand_id: options.id,
      brand_name: options.brandName,
      brand_img: options.brandImg,
      desc: options.desc
    })
    this.getGoodsList();
  },

  getGoodsList: function() {
    var self = this
    server.api(api.goodsList, {
      brandId: this.data.brand_id
    }, "post").then(function(res) {
      // console.info(res)
      self.setData({
        goodsList: res
      })
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