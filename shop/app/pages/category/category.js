var server = require('../../utils/server.js');
var api = require('../../config/api.js');

const app = getApp()
Page({
  data: {
    // text:"这是一个页面"
    navList: [],
    goodsList: [],
    id: 0,
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 10000
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    // console.info(app.globalData.subCategory)
    if (options.id) {
      that.setData({
        id: parseInt(options.id)
      });
    }
    if (options.parentid) {
      this.getSubCategory(options.parentid)
    } else {
      that.setData({
        navList: app.globalData.subCategory
      });
    }

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    this.getGoodsList();
  },

  getGoodsList: function() {
    var self = this
    // console.info(this.data.id)
    server.api(api.goodsList, {
      categoryId: this.data.id
    }, "post").then(function(res) {
      // console.info(res)
      self.setData({
        goodsList: res
      })
    })
  },

  getSubCategory: function(parentid) {
    var self = this
    server.api(api.category, {}, "post").then(function(res) {
      // console.info(res)
      for (var i in res) {
        if (res[i].id == parentid) {
          self.setData({
            navList: res[i]
          })
        }
      }
      

    })
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
    // console.log(1);
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  switchCate: function(event) {
    if (this.data.id == event.currentTarget.dataset.id) {
      return false;
    }
    var that = this;
    var clientX = event.detail.x;
    var currentTarget = event.currentTarget;
    if (clientX < 60) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft - 60
      });
    } else if (clientX > 330) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft
      });
    }
    this.setData({
      id: event.currentTarget.dataset.id
    });

    this.getGoodsList();
  }
})